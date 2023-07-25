import React from "react";

import type { Quantity } from "../../pages/AddBillFormPage";
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
      {afterFilterItems?.map((item: Item) => {
        return (
          item.active && (
            <ItemCard
              name={item.name}
              price={item.price}
              stock={item.stock}
              itemId={item.itemId}
              discountPer={item.discountPer}
              key={item.itemId}
              updateQuantity={updateQuantity}
            />
          )
        );
      })}
    </>
  );
};

export default ItemList;
