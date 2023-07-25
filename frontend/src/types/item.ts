import type { Category } from "./category";

export type Item = {
  itemId?: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  discountPer: number;
  costPrice: number;
  supplier: string;
  category?: Category;
};

export type ItemRequest = {
  itemId?: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  discountPer: number;
  costPrice: number;
  supplier: string;
  category: {
    id: number;
  };
};

export type AddItemArgs = {
  item: Item;
  categoryId: number;
};
