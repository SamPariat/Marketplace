import type { Item } from "./item";

export type Bill = {
  billId?: number;
  serviceTax: number;
  cgst: number;
  sgst: number;
  discountPercentage: number;
  discountAmount: number;
  totalAmount: number;
  timeStamp?: Date;
  billerId: number;
  items: Array<Item>;
};

export type BillRequest = {
  items: Array<{ itemId: number }>;
} & Omit<Bill, "billId" | "timeStamp" | "items">;

export type BillingRequest = {
  billingTable: BillRequest;
  itemQuantities: Map<string, number>;
};
