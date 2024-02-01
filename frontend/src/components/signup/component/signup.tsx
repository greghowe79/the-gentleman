import { component$, useStore, useSignal, $, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Message } from '~/components/ui/message';
import { validateEmail } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';
import styles from '../styles/signup.module.css';
import { BodyContext } from '~/root';

export interface LoginProps {
  isLoginForm: { active: boolean };
}

export const SignUp = component$<LoginProps>(({ isLoginForm }) => {
  const backgroundColor = useContext(BodyContext);
  const message: any = useStore({ message: '', status: 'error' });
  const isLoading = useSignal(false);
  // const isLoginForm = useSignal(false);

  // Handle email signup
  const handleEmailSignup = $(async (event: any) => {
    // Initialize resets
    message.message = undefined;
    message.status = 'error';
    isLoading.value = true;

    // Value extraction
    const email = event.target.email.value;
    const isTerms = event.target.terms.checked;
    const isEmailValid = validateEmail(email);

    // Email validation
    if (!isEmailValid) {
      message.message = 'You must have a valid email';
      isLoading.value = false;
      return;
    }

    // Terms validation
    if (!isTerms) {
      message.message = 'You must agree to our terms, privacy and disclaimer before signing up';
      isLoading.value = false;
      return;
    }

    // Set password
    const timestamp = Date.now();
    const pwd = Math.floor(Math.random() * 1000000) + email + timestamp;

    // Create user in supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pwd,
    });

    // Confirm signup
    if (data.user?.id) {
      message.message = 'Success. Please check your email/spam folder';
      message.status = 'success';
      event.target.email.value = '';
      isLoading.value = false;
    } else {
      message.message = 'There was a problem creating a user. ' + error?.message;
      isLoading.value = false;
    }
  });

  return (
    <div class="" style={{ padding: '30px 60px', height: '400px' }}>
      <div
        class=""
        style={{
          display: 'flex',
          color: backgroundColor.value,
          fontSize: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div> Create a new account</div>
      </div>

      <div class="" style={{ marginTop: '30px' }}>
        <div>
          <div>
            <div>
              <div>
                <div />
              </div>
              <div
                class=""
                style={{
                  display: 'flex',
                  color: 'rgba(119, 119, 119, 0.6)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 'var(--font-size-xs)',
                  margin: '15px 0',
                }}
              >
                <span>
                  Or{' '}
                  <span
                    onClick$={() => {
                      isLoginForm.active = true;
                    }}
                    style={{
                      color: backgroundColor.value,
                      cursor: 'pointer',
                    }}
                  >
                    {' '}
                    login to your existing account
                  </span>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit$={handleEmailSignup} preventdefault:submit>
            <div>
              <div>
                <label class={styles['label']}>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="email" required class={styles['input']} />
                </label>
              </div>
            </div>

            <div
              class=""
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '15px 0 30px',
              }}
            >
              <input id="terms" name="terms" type="checkbox" class="" />
              <label class={styles['terms_privacy_disclaimer']}>
                <span class={styles['standard']}>
                  Agree to{' '}
                  <Link href="/terms" style={{ color: backgroundColor.value }}>
                    <span class="">terms</span>
                  </Link>
                  ,{' '}
                  <Link href="/privacy" style={{ color: backgroundColor.value }}>
                    <span class="">privacy</span>
                  </Link>{' '}
                  and{' '}
                  <Link href="/disclaimer" style={{ color: backgroundColor.value }}>
                    <span class="">disclaimer</span>
                  </Link>
                </span>
              </label>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button type="submit" disabled={isLoading.value} class="" style={{ width: '100%', background: backgroundColor.value }}>
                Register
              </button>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: 'var(--description-color)', fontSize: '0.6rem' }}>No password required. Authorize via email.</p>
              </div>
            </div>
            <Message message={message} />
          </form>
        </div>
      </div>
    </div>
  );
});
