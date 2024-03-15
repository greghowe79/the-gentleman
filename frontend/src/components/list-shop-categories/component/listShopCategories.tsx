import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { categories } from '../data/data';
import { categoryList } from '../styles/styles.css';

export const ListShopCategories = component$(() => {
  return (
    <div style={{ paddingTop: '60px' }}>
      <ul style={{ listStyle: 'none', padding: '0 15px' }}>
        {categories.map((category) => {
          return (
            <li key={category.id} style={{ marginTop: '15px' }}>
              <Link class={categoryList} href={'/shop/' + category.slug}>
                {category.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
