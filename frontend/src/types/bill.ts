import { Item } from "./item";

export type Bill = {
  billing: number;
  serviceTax: number;
  cgst: number;
  sgst: number;
  discountPercentage: number;
  discountAmount: number;
  totalAmount: number;
  timeStamp: Date;
  billerId: number;
  items: Array<Item>;
  item_id: number;
};

export type BillRequest = {
  serviceTax: number;
  cgst: number;
  sgst: number;
  discountPercentage: number;
  discountAmount: number;
  totalAmount: number;
  timeStamp: Date;
  billerId: number;
  items: Set<{ itemId: number }>;
};
