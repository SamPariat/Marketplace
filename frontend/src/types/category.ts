import type { Item } from "./item";

export type Category = {
  id?: number;
  tax?: number;
  serviceTax?: number;
  name: string;
  isTaxApplicable: boolean;
  items?: Array<Item>;
};
