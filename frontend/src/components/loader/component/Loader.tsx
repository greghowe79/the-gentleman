import { component$, useContext } from '@builder.io/qwik';
import { BodyContext } from '~/root';
import { loaderStyle, loaderContainer } from '../styles/styles.css';

const Loader = component$(() => {
  const backgroundColor = useContext(BodyContext);

  return (
    <div class={loaderContainer} style={{ height: 'calc(100vh - var(--header-height))' }}>
      <span class={loaderStyle} style={`--loader-color: ${backgroundColor.value}`}></span>
    </div>
  );
});

export default Loader;
