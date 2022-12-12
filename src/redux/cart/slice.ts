import { CartSliceState, CartItem } from './types';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { items, totalCount, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },

    minusProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
        state.totalCount--;
        console.log(findItem.count);
        if (findItem.count === 0) {
          state.items = state.items.filter(
            (obj) => obj.id !== action.payload.id
          );
        }
      }
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      if (state.items.length === 0) {
        state.totalPrice = 0;
        state.totalCount = 0;
      } else {
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count - sum;
        }, 0);

        state.totalCount = state.items.reduce((sum, obj) => {
          return obj.count - sum;
        }, 0);
      }
    },

    clearProduct(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, minusProduct, removeProduct, clearProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
