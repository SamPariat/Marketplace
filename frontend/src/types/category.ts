import type { Item } from "./item";

export type Category = {
  id?: number;
  name: string;
  isTaxApplicable: boolean;
  items?: Array<Item>;
};
