import {
  Resource,
  component$,
  useContext,
  useResource$,
  useSignal,
} from '@builder.io/qwik';
import styles from '../styles/search-bar.module.css';
import { BodyContext } from '~/root';

export const SearchBar = component$(() => {
  const backgroundColor = useContext(BodyContext);

  const query = useSignal('');
  const result = useSignal(0);

  const jokes = useResource$<{ value: string }[]>(
    async ({ track, cleanup }) => {
      track(() => query.value);
      // A good practice is to use `AbortController` to abort the fetching of data if
      // new request comes in. We create a new `AbortController` and register a `cleanup`
      // function which is called when this function re-runs.
      const controller = new AbortController();
      cleanup(() => controller.abort());

      if (query.value.length < 3) {
        return [];
      }

      const url = new URL('https://api.chucknorris.io/jokes/search');
      url.searchParams.set('query', query.value);

      const resp = await fetch(url, { signal: controller.signal });
      const json = (await resp.json()) as { result: { value: string }[] };
      result.value = json.result.length;
      return json.result;
    }
  );
  // const data = jokes.length > 0;
  // console.log({ data });

  return (
    <div class={styles['general-wrapper']}>
      <div
        class={styles['input-wrapper']}
        style={{
          transform:
            result.value > 0 && query.value.length > 3
              ? '0'
              : 'translateY(calc(7.07px * 50)) translateY(-50%)',
        }}
      >
        <div
          class={styles['search-title']}
          style={{ color: backgroundColor.value }}
        >
          Search the store
        </div>
        <div style={{ paddingTop: '15px', color: backgroundColor.value }}>
          <label class={styles['label']}>
            <input
              type="text"
              bind:value={query}
              placeholder="Search"
              class={styles['input']}
            />
          </label>
          <div
            class={styles['scrollable']}
            style={{
              marginTop:
                result.value > 0 && query.value.length > 3 ? '15px' : '0',
              overflowX: 'hidden',
              overflowY:
                result.value > 0 && query.value.length > 3 ? 'auto' : 'hidden',
              height:
                result.value > 0 && query.value.length > 3 ? '77.5vh' : '0vh',
            }}
          >
            <Resource
              value={jokes}
              onPending={() => <>loading...</>}
              onResolved={(jokes) => (
                <ul>
                  {jokes.map((joke, i) => (
                    <li key={i}>{joke.value}</li>
                  ))}
                </ul>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
