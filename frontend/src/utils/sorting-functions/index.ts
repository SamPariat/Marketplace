import type { Category } from "../../types/category";

export const sortCategoriesByNameAscending = (categories: Array<Category>) =>
  [...categories].sort((a, b) => a.name.localeCompare(b.name));

export const sortCategoriesByNameDescending = (categories: Array<Category>) =>
  [...categories].sort((a, b) => b.name.localeCompare(a.name));
