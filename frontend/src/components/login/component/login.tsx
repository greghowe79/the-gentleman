import { component$, useStore, useSignal, $, useContext } from '@builder.io/qwik';
import { Message } from '~/components/ui/message';
import { validateEmail } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';
import styles from '../../signup/styles/signup.module.css';
import { BodyContext } from '~/root';
import { type LoginProps } from '~/components/signup/component/signup';

export const REDIRECT_URL = 'http://localhost:80/login/staging';

export const Login = component$<LoginProps>(({ isLoginForm }) => {
  const backgroundColor = useContext(BodyContext);
  const message: any = useStore({ message: '', status: 'error' });
  const isLoading = useSignal(false);

  const signInWithGithub = $(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',

      options: {
        redirectTo: REDIRECT_URL,
      },
    });
    console.log(data);
    console.log('Error', error);
  });

  // Handle email login
  const handleEmailLogin = $(async (event: any) => {
    // Initialize resets
    message.message = undefined;
    message.status = 'error';
    isLoading.value = true;

    // Value extraction
    const email = event.target.email.value;

    const isEmailValid = validateEmail(email);

    // Email validation
    if (!isEmailValid) {
      message.message = 'You must have a valid email';
      isLoading.value = false;
      return;
    }

    // Login user in supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: REDIRECT_URL,
      },
    });

    // Confirm login
    if (data && !error) {
      message.message = 'Success. Please check your email/spam folder';
      message.status = 'success';
      event.target.email.value = '';
      isLoading.value = false;
    } else {
      message.message = 'You need to register a new account before logging in.';
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>Login to your account</div>
      </div>
      <div
        class=""
        style={{
          display: 'flex',
          color: 'rgba(119, 119, 119, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 'var(--font-size-xs)',
          margin: '30px 0 22.5px 0',
        }}
      >
        <span>
          Or{' '}
          <span
            onClick$={() => {
              isLoginForm.active = false;
            }}
            style={{
              color: backgroundColor.value,
              cursor: 'pointer',
            }}
          >
            register a new account
          </span>
        </span>
      </div>

      <div>
        <div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '43%',
                  borderRadius: '4px',
                  border: `1px solid ${backgroundColor.value}`,
                  background: 'rgba(0, 0, 0, 0.04)',
                  padding: '5px',
                }}
              >
                <a href="#">
                  <span>
                    <svg
                      style={{ display: 'flex', width: '25px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="var(--description-color)"
                      viewBox="0 0 16 16"
                    >
                      {' '}
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{' '}
                    </svg>
                  </span>
                </a>
              </div>

              <div
                onClick$={signInWithGithub}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '43%',
                  borderRadius: '4px',
                  border: `1px solid ${backgroundColor.value}`,
                  background: 'rgba(0, 0, 0, 0.04)',
                  padding: '5px',
                  cursor: 'pointer',
                  color: backgroundColor.value,
                }}
              >
                <span>
                  <svg style={{ display: 'flex', width: '25px' }} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <div>
                <div />
              </div>
            </div>
          </div>

          <form onSubmit$={handleEmailLogin} preventdefault:submit>
            <div>
              <div>
                <label class={styles['label']}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="email"
                    required
                    class={styles['input']}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button
                type="submit"
                disabled={isLoading.value}
                class=""
                style={{ width: '100%', background: backgroundColor.value }}
              >
                Login
              </button>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: 'var(--description-color)', fontSize: '0.6rem' }}>
                  No password required. Authorize via email.
                </p>
              </div>
            </div>
            <Message message={message} />
          </form>
        </div>
      </div>
    </div>
  );
});
