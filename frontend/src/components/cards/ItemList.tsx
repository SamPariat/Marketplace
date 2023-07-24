import React from "react";

import type { Quantity } from "../../components/forms/AddBillFormPage";
import type { Item } from "../../types/item";
import ItemCard from "./ItemCard";

type ItemListProps = {
  renderedItems: Array<Item> | null;
  updateQuantity: React.Dispatch<React.SetStateAction<Quantity>>;
  filter: string;
};

const ItemList = ({ renderedItems, updateQuantity, filter }: ItemListProps) => {
  const afterFilterItems = renderedItems?.filter((item) =>
    item.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <>
      {afterFilterItems?.map((item: Item) => (
        <ItemCard
          name={item.name}
          price={item.price}
          stock={item.stock}
          itemId={item.itemId}
          key={item.itemId}
          updateQuantity={updateQuantity}
        />
      ))}
    </>
  );
};

export default ItemList;
