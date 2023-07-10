export type Item = {
  itemId: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  discountPer: number;
  discountPrice: number;
};

export type ItemRequest = {
  itemId: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  discountPer: number;
  discountPrice: number;
  category: {
    id: number;
  };
};
