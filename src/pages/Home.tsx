import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import {
  Categories,
  Sort,
  PizzaBlock,
  PizzaBlockSkeleton,
  Pagination,
  sortList,
} from '../components';

import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { selectPizza } from '../redux/pizza/selectors';
import {
  selectCategoryId,
  selectCurrentPage,
  selectFilter,
  selectSort,
} from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';

export const Home: React.FC = () => {
  const categoryId = useAppSelector(selectCategoryId);
  const selectedItem = useAppSelector(selectSort);
  const currentPage = useAppSelector(selectCurrentPage);
  const { items, status } = useAppSelector(selectPizza);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = useAppSelector(selectFilter);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const pizzasSkeleton = [...Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  const getPizzas = () => {
    const order = selectedItem.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = selectedItem.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage, category, sortBy, order, search }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        { sortProperty: selectedItem.sortProperty, currentPage, categoryId },
        {
          addQueryPrefix: true,
        }
      );

      navigate(queryString);
    }
    isMounted.current = true;
  }, [selectedItem.sortProperty, currentPage, categoryId, navigate]);

  type SearchPizzaParams = {
    sortProperty: string;
    order: string;
    categoryId: string;
    search: string;
    currentPage: string;
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
    }
    isMounted.current = true;
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, selectedItem.sortProperty, searchValue, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = useCallback(
    (index: number) => dispatch(setCategoryId(index)),
    [dispatch]
  );

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          selectedCategory={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={selectedItem} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'error'
          ? 'ошибка'
          : status === 'loading'
          ? pizzasSkeleton
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
