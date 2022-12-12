export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}
