import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { a, b, c, d, container } from '../styles/style.css';

const Connected = component$(() => {
  return (
    <div class={container}>
      <div class={a}>box A</div>
      <div class={b}>box B</div>
      <div class={c}>
        box C<Link href="/upload-products">Upload products</Link>
      </div>
      <div class={d}>box D</div>
    </div>
  );
});

export default Connected;
