import { useParams } from "react-router-dom";
import useGetData from "../utils/hooks/useGetData";
import { getItemById } from "../api/item-api";

const ItemDetailsPage = () => {
  const { itemId } = useParams();

  const { data: item } = useGetData(() => getItemById(Number(itemId)));

  console.log(item);

  return <div className="flex flex-grow">
    <div className="bg-slate-500 rounded-lg">
      <label></label>
      
    </div>
  </div>;
};

export default ItemDetailsPage;
