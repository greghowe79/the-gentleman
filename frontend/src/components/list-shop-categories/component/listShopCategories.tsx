import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { categories } from '../data/data';
import { categoryList } from '../styles/styles.css';
import { BodyContext } from '~/root';

export const ListShopCategories = component$(() => {
  const backgroundColor = useContext(BodyContext);

  return (
    <div style={{ paddingTop: '60px' }}>
      <ul style={{ listStyle: 'none', padding: '0 15px' }}>
        {categories.map((category) => {
          return (
            <li key={category.id} style={{ marginTop: '15px' }}>
              <Link class={categoryList} href={'/shop/' + category.slug} style={{ color: backgroundColor.value }}>
                {category.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
