export type User = {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "BILLER" | "INVENTORY_MANAGER";
};
