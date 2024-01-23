import { type Signal, component$ } from '@builder.io/qwik';
import { arrowSvgStyle } from '../styles/styles.css';

interface IconProps {
  rotation: Signal<number>;
}

const CustomIcon = component$(({ rotation }: IconProps) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 128.000000 128.000000"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `rotate(${rotation.value}deg)` }}
      class={arrowSvgStyle}
    >
      <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill="rgb(87, 87, 87)" stroke="none">
        <path
          d="M282 838 c-33 -33 -15 -60 161 -236 131 -131 178 -172 197 -172 37 0
370 334 370 371 0 32 -17 49 -49 49 -20 0 -61 -35 -173 -147 l-148 -148 -148
148 c-150 149 -178 167 -210 135z"
        />
      </g>
    </svg>
  );
});

export default CustomIcon;
