import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { BodyContext, CategoryCountContext, FiltersContext, NavbarContext } from '~/root';
import {
  pointStyle,
  spanStyle,
  linkStyle,
  // shopTitleStyle,
  // shopWrapperContent,
  // categoryMenuContainer,
  //leftWrapper,
  shopArea,
  shopContainer,
  shopHeaderArea,
  shopHeaderContainer,
  shopBreadcrumb,
  hidden,
  wall,
  results,
  wallHeaderOffset,
  wallBreadcrumbs,
  wallBreadcrumbsList,
  linkWallBreadcrumbsItem,
  wallBreadcrumbsSeparator,
  pointHeaderPositionAnchor,
  headerPosition,
  wallHeaderShowCount,
  wallHeaderContent,
  wallHeaderTitle,
  wallHeaderItemCount,
  wallHeaderNav,
  filtersBtn,
  filtersBtnFilterText,
  iconFilterDs,
  sort,
  dropdownAnchoredRight,
  dropdownBtn,
  dropdownBtnTextWrapper,
  dropdownBtnText,
  dropdownBtnSelectedText,
  iconChevron,
  dropdownOptionsWrapper,
  dropdownPptionsList,
  dropdownOption,
  //resultsBody,
  //inScroller,
  simpleWrapper,
  simplebarHeightAutoObserverWrapper,
  simplebarHeightAutoObserver,
  simplebarMask,
  simplebarOffset,
  simplebarContentWrapper,
  simplebarContent,
  leftNavWrapper,
  leftNavCategoriesPresent,
  categoriesIsDesktop,
  categoriesItem,
  collapsibleFilterGroupFilterGroupClosed,
  collapseTrigger,
  triggerContent,
  triggerContentLabel,
  filterGroupCountIsHidden,
  iconChevronFilters,
  collapsibleContentOuter,
  collapsibleContentInnerFilterGroupContent,
  filterItemIsDefault,
  pseudoCheckbox,
  filterItemLabel,
  ContentOuterHidden,
  groupContent,
  filterGroupItemsGroup,
  filterItemSize,
  collapsibleContentOuterSize,
  // filtersVisible,
} from './styles.css';
import { Arrow } from '~/components/starter/icons/arrow';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import FilterIcon from '~/components/starter/icons/filter';
import ChevronIcon from '~/components/starter/icons/chevron';
import ShopProducts from '.';
import ProductListPage from './[category]';
import { ListShopCategories } from '~/components/list-shop-categories/component/listShopCategories';

export interface Product {
  id: number;
  created_at: Date;
  name: string;
  description: string;
  price: number;
}

interface Products {
  products: Product[];
}

export const useProducts = routeLoader$(async () => {
  const response = await fetch('http://localhost:3005/api_v1/shop', {
    headers: { Accept: 'application/json' },
  });
  const shop: Products | any = await response.json();
  return shop;
});

const Shop = component$(() => {
  const loc = useLocation();
  const isNavbarVisible = useContext(NavbarContext);
  const products = useProducts();
  const backgroundColor = useContext(BodyContext);
  const categoryCount = useContext(CategoryCountContext);
  const isDropdownOpen = useSignal(false);
  const selectedOption = useSignal('');
  const isFilterVisible = useContext(FiltersContext);
  const isGenderFilterOpen = useSignal(false);
  const isBrandFilterOpen = useSignal(false);
  const isSizeFilterOpen = useSignal(false);

  // Mapping signals to filters
  const filterSignals = [isGenderFilterOpen, isBrandFilterOpen, isSizeFilterOpen];

  const toggleFilter = $((index: number) => {
    filterSignals[index].value = !filterSignals[index].value;
  });

  // const ToggleFiltersPanelStyles = {
  //   transform: isFilterVisible.value ? 'translateX(0%)' : 'translateX(-100%)',
  //   width: isFilterVisible.value ? '260px' : '0',
  // };

  const filters = [
    { title: 'Gender', options: ['Men', 'Women', 'Unisex'], urls: ['/api/men', '/api/women', '/api/unisex'] },
    { title: 'Brand', options: ['Nike', 'Adidas', 'Brooks'], urls: ['/api/nike', '/api/adidas', '/api/brooks'] },
    {
      title: 'Size',
      options: [
        '1',
        '1.5',
        '2',
        '2.5',
        '3',
        '3.5',
        '4',
        '4.5',
        '5',
        '5.5',
        '6',
        '6.5',
        '7',
        '7.5',
        '8',
        '8.5',
        '9',
        '9.5',
        '10',
        '10.5',
        '11',
        '11.5',
        '12',
        '12.5',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
      ],
      urls: [
        '/api/size/1',
        '/api/size/1.5',
        '/api/size/2',
        '/api/size/2.5',
        '/api/size/3',
        '/api/size/3.5',
        '/api/size/4',
        '/api/size/4.5',
        '/api/size/5',
        '/api/size/5.5',
        '/api/size/6',
        '/api/size/6.5',
        '/api/size/7',
        '/api/size/7.5',
        '/api/size/8',
        '/api/size/8.5',
        '/api/size/9',
        '/api/size/9.5',
        '/api/size/10',
        '/api/size/10.5',
        '/api/size/11',
        '/api/size/11.5',
        '/api/size/12',
        '/api/size/12.5',
        '/api/size/13',
        '/api/size/14',
        '/api/size/15',
        '/api/size/16',
        '/api/size/17',
        '/api/size/18',
      ],
    },
  ];

  return (
    <div class={shopArea}>
      <div class={shopContainer}>
        <div class={isNavbarVisible.value ? shopHeaderArea : hidden}>
          <div class={shopHeaderContainer}>
            <div class={shopBreadcrumb}>
              <span class={spanStyle} style={{ padding: '0 30px' }}>
                <Arrow fill={backgroundColor.value} />
              </span>
              <span class={spanStyle}>
                <Link class={linkStyle} href="/">
                  <span>home</span>
                </Link>
                <strong class={pointStyle}>&nbsp; . &nbsp;</strong>
              </span>
              <span class={spanStyle}>
                {/*  */}
                {loc.params.category ? (
                  <Link class={linkStyle} href="/shop">
                    <span>shop</span>
                  </Link>
                ) : (
                  <span style={{ color: backgroundColor.value, cursor: 'default' }} class={linkStyle}>
                    shop
                  </span>
                )}

                {/*  */}
                {loc.params.category && <strong class={pointStyle}>&nbsp; . &nbsp;</strong>}
              </span>
              {loc.params.category && (
                <span class={spanStyle}>
                  <span style={{ color: backgroundColor.value, cursor: 'default' }} class={linkStyle}>
                    {loc.params.category.replace(/-/g, ' ')}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <div class={shopWrapperContent}>
          <div class={categoryMenuContainer}>
            <div>
              <div class={shopTitleStyle}>Shop</div>
            </div>
            <ListShopCategories />
          </div>

          <div class={leftWrapper}>{loc.url.pathname === '/shop/' ? <ShopProducts data={products.value} /> : <ProductListPage />}</div>
        </div> */}

        {/* ----------------------------------------------------------------------------- */}

        <div id="app-root" style={{ marginTop: 'var(--top-bar-height)' }}>
          <div class={wall}>
            <div class={results}>
              <div class={wallHeaderOffset}></div>
              <div class={wallBreadcrumbs}>
                <ol class={wallBreadcrumbsList}>
                  {loc.url.pathname === '/shop/' ? null : (
                    <>
                      <li style={{ display: 'inline-block' }}>
                        <Link href="#" class={linkWallBreadcrumbsItem}>
                          category
                        </Link>
                      </li>
                      <span class={wallBreadcrumbsSeparator}>/</span>
                      <li style={{ display: 'inline-block' }}>
                        <Link href="#" class={linkWallBreadcrumbsItem}>
                          {loc.params.category}
                        </Link>
                      </li>
                    </>
                  )}
                </ol>
              </div>
              <div class={pointHeaderPositionAnchor}></div>
              <div class={headerPosition}>
                <header class={wallHeaderShowCount}>
                  <div class={wallHeaderContent}>
                    <h1 class={wallHeaderTitle}>
                      {loc.url.pathname === '/shop/' ? 'Categories' : `Running ${loc.params.category}`}
                      {loc.url.pathname === '/shop/' ? null : <span class={wallHeaderItemCount}>{`(${categoryCount.value})`}</span>}
                    </h1>
                    <nav class={wallHeaderNav}>
                      <button class={filtersBtn} onClick$={() => (isFilterVisible.value = !isFilterVisible.value)}>
                        <span class={filtersBtnFilterText}>
                          {loc.url.pathname === '/shop/'
                            ? isFilterVisible.value
                              ? 'Hide Categories'
                              : 'Show Categories'
                            : isFilterVisible.value
                            ? 'Hide Filters'
                            : 'Show Filters'}
                        </span>
                        <FilterIcon class={iconFilterDs} />
                      </button>
                      {loc.url.pathname === '/shop/' ? null : (
                        <div class={sort} onClick$={() => (isDropdownOpen.value = !isDropdownOpen.value)}>
                          <div class={dropdownAnchoredRight}>
                            <div>
                              <button class={dropdownBtn}>
                                <span class={dropdownBtnTextWrapper}>
                                  <span class={dropdownBtnText}>{`Sort By: ${' '}`}</span>
                                  <span class={dropdownBtnSelectedText}>{selectedOption.value}</span>
                                </span>
                                <div class={iconChevron}>
                                  <span>
                                    <ChevronIcon />
                                  </span>
                                </div>
                              </button>
                              <div
                                class={dropdownOptionsWrapper}
                                style={{
                                  display: isDropdownOpen.value ? '' : 'none',
                                  pointerEvents: isDropdownOpen.value ? 'all' : 'none',
                                }}
                              >
                                <div
                                  class={dropdownPptionsList}
                                  style={{
                                    visibility: isDropdownOpen.value ? 'visible' : 'hidden',
                                    transform: isDropdownOpen.value ? 'translateY(0%)' : 'translateY(-100%)',
                                  }}
                                >
                                  <button class={dropdownOption} onClick$={() => (selectedOption.value = 'Price: High-Low')}>
                                    Price: High-Low
                                  </button>
                                  <button class={dropdownOption} onClick$={() => (selectedOption.value = 'Price: Low-High')}>
                                    Price: Low-High
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </nav>
                  </div>
                </header>
              </div>
              <div class={wallHeaderOffset}></div>

              <div class={`resultsBody ${isFilterVisible.value ? 'filtersVisible' : ''}`}>
                <div class={'inScroller'}>
                  <div class={simpleWrapper}>
                    <div class={simplebarHeightAutoObserverWrapper}>
                      <div class={simplebarHeightAutoObserver}></div>
                    </div>
                    <div class={simplebarMask}>
                      <div class={[simplebarOffset, 'simplebarOffset']}>
                        <div class={simplebarContentWrapper}>
                          <div class={simplebarContent}>
                            <div class={leftNavWrapper}>
                              {' '}
                              {loc.url.pathname === '/shop/' ? (
                                <ListShopCategories />
                              ) : (
                                <nav class={leftNavCategoriesPresent}>
                                  <div>
                                    <div class={categoriesIsDesktop}>
                                      <div>
                                        {/* ITERARE */}
                                        <button class={categoriesItem}>Road</button>
                                        <button class={categoriesItem}>Road Racing</button>
                                        <button class={categoriesItem}>Trail Running</button>
                                        <button class={categoriesItem}>Track & Field</button>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="left-nav-filters">
                                    <div id="filters">
                                      {/* TEST*/}
                                      {filters.map((filter, index) => (
                                        <div
                                          key={index}
                                          class={collapsibleFilterGroupFilterGroupClosed}
                                          // onClick$={() => (isFilterOpen.value = !isFilterOpen.value)}
                                          onClick$={() => toggleFilter(index)}
                                        >
                                          <span class={collapseTrigger}>
                                            <div class={triggerContent}>
                                              <div class={triggerContentLabel}>
                                                {filter.title}&nbsp;<div class={filterGroupCountIsHidden}>(0)</div>
                                              </div>
                                              <div class={iconChevronFilters}>
                                                <ChevronIcon />
                                              </div>
                                            </div>
                                          </span>
                                          <div
                                            class={`${filter.title === 'Size' ? collapsibleContentOuterSize : collapsibleContentOuter} ${
                                              filterSignals[index].value ? '' : ContentOuterHidden
                                            }`}
                                          >
                                            <div class={filter.title === 'Size' ? groupContent : collapsibleContentInnerFilterGroupContent}>
                                              <div class={filter.title === 'Size' ? filterGroupItemsGroup : ''}>
                                                {filter.options.map((option, optionIndex) => (
                                                  <button
                                                    key={option}
                                                    aria-label={`Filter for ${option}`}
                                                    class={filter.title === 'Size' ? filterItemSize : filterItemIsDefault}
                                                    data-url={filter.urls[optionIndex]}
                                                    role="checkbox"
                                                    type="button"
                                                    aria-checked="false"
                                                    data-group-ndx="1"
                                                    data-group-type="filter"
                                                    data-is-color="false"
                                                    data-ndx="0"
                                                  >
                                                    {filter.title === 'Size' ? null : <div class={pseudoCheckbox}></div>}

                                                    <span class={filterItemLabel}>{option}</span>
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      {/* FINE TEST*/}

                                      {/* ITERARE */}
                                    </div>
                                  </div>
                                </nav>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class={'leftWrapper'}>
                  {loc.url.pathname === '/shop/' ? <ShopProducts data={products.value} /> : <ProductListPage />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
});
export default Shop;
