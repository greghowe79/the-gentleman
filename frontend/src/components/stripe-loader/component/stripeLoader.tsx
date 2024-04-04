import { component$ } from '@builder.io/qwik';

const StripeLoader = component$(() => {
  return (
    <div class="loading">
      <span class="loading-dots">•</span>
      <p class="loading-text">Redirect to stripe</p>
    </div>
  );
});

export default StripeLoader;
