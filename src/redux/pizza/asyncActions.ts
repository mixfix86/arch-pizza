import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchParams, PizzaItem } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchParams>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://635553b8483f5d2df3b21844.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);
