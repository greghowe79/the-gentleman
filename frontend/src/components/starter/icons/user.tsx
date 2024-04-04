import type { QwikIntrinsicElements } from '@builder.io/qwik';

export function FaUserO(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      style="pointer-events: none; width: 24px; height: 24px; fill: #ffffff"
      {...props}
      key={key}
    >
      <g>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
      </g>
    </svg>
  );
}

export default FaUserO;
