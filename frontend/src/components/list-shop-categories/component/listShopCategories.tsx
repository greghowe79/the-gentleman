import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { categories } from '../data/data';
import { categoryList } from '../styles/styles.css';
import { categoriesItem } from '~/routes/shop/styles.css';

export const ListShopCategories = component$(() => {
  return (
    <div>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {categories.map((category) => {
          return (
            <button key={category.id} class={categoriesItem}>
              <Link class={categoryList} href={'/shop/' + category.slug}>
                {category.text}
              </Link>
            </button>
          );
        })}
      </ul>
    </div>
  );
});
