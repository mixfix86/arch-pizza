export type SortItem = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

export type FilterSliceState = {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortItem;
};
