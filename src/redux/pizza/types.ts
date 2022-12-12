export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: string[];
  price: number;
  category: number;
  rating: number;
};

export type FetchParams = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
