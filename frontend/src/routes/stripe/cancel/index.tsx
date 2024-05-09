import { component$ } from '@builder.io/qwik';

const StripeCancel = component$(() => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Payment failed. Try again</h2>
      </div>
    </div>
  );
});

export default StripeCancel;
