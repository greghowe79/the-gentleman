import { component$, $, type QwikMouseEvent, useSignal } from '@builder.io/qwik';

import { formatCategory, rotateArrow } from '../actions/actions';
import { pointer, labelStyle, ulContainer, listStyle, listItem, customSelectStyle } from '../style/style.css';
import { type SelectProps } from '../types/types';
import CustomIcon from '~/components/custom-icon/component/customIcon';

const CustomSelect = component$(({ selectedOption, categorySlug, options }: SelectProps) => {
  const rotation = useSignal(0);
  const open = useSignal(false);

  // const rotateArrow = $(() => {
  //   open.value = !open.value;
  //   rotation.value = open.value ? rotation.value + 180 : 0;
  // });

  const handleSelectChange = $((event: QwikMouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    const newValue = target.childNodes[0].nodeValue!;
    selectedOption.value = newValue;
    rotateArrow(open, rotation);
    formatCategory(selectedOption.value, categorySlug);
    return selectedOption.value;
  });
  return (
    <div>
      <div>
        <label for="categories" class={labelStyle}>
          <input
            type="text"
            disabled
            id="categories"
            name="categories"
            class={[customSelectStyle, 'select']}
            value={selectedOption.value}
            placeholder="Please choose a category"
          />
          <div onClick$={() => rotateArrow(open, rotation)} class={pointer}>
            <CustomIcon rotation={rotation} />
          </div>
        </label>
      </div>
      {open.value && (
        <div class={ulContainer}>
          <ul class={listStyle}>
            {options.map((option) => (
              <li key={option.value} onClick$={handleSelectChange} class={listItem}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default CustomSelect;
