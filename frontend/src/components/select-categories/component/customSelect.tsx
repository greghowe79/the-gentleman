import { component$, $, type QwikMouseEvent, useSignal } from '@builder.io/qwik';

import { formatCategory, rotateArrow } from '../actions/actions';
import { pointer, labelStyle, ulContainer, listStyle, listItem, customSelectStyle } from '../style/style.css';
import { type SelectProps } from '../types/types';
import CustomIcon from '~/components/custom-icon/component/customIcon';

const CustomSelect = component$(({ selectedOption, categorySlug, options, exist, placeholder }: SelectProps) => {
  const rotation = useSignal(0);
  const open = useSignal(false);
  const shouldFormatCategory = useSignal(exist);

  const handleSelectChange = $((event: QwikMouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    const newValue = target.childNodes[0].nodeValue!;
    selectedOption.value = newValue;
    rotateArrow(open, rotation);
    if (shouldFormatCategory.value) {
      if (categorySlug) formatCategory(selectedOption.value, categorySlug);
    }

    return selectedOption.value;
  });
  return (
    <div>
      <div>
        <label
          for="categories"
          class={labelStyle}
          style={{ width: !exist ? 'var(--input-width-sm)' : '', marginLeft: !exist ? '1vw' : '' }}
        >
          <input
            type="text"
            disabled
            id="categories"
            name="categories"
            style={{ height: !exist ? 'var(--input-height-sm)' : '', padding: !exist ? '0 12px' : '' }}
            class={[customSelectStyle, 'select']}
            bind:value={selectedOption}
            placeholder={placeholder}
          />
          <div
            onClick$={() => rotateArrow(open, rotation)}
            class={pointer}
            style={{ height: !exist ? 'var(--input-height-sm)' : '' }}
          >
            <CustomIcon rotation={rotation} />
          </div>
        </label>
      </div>
      {open.value && (
        <div
          class={[ulContainer, 'ulContainer']}
          style={{
            width: !exist ? 'var(--input-width-sm)' : '',
            marginLeft: !exist ? '1vw' : '',
            height: !exist ? 'calc(var(--input-height-sm) * 4 + 4px)' : '',
            overflowY: !exist ? 'auto' : 'hidden',
          }}
        >
          <ul class={listStyle}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick$={handleSelectChange}
                class={listItem}
                style={{ height: !exist ? 'var(--input-height-sm)' : '' }}
              >
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
