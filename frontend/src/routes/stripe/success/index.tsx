import { component$ } from '@builder.io/qwik';

const StripeSuccess = component$(() => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Payment success</h2>
      </div>
    </div>
  );
});

export default StripeSuccess;
