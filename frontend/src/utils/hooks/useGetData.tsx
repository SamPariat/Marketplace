import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { handleError } from "..";
import { CustomResponse } from "../../types/custom-response";

/**
 * Custom hook for handling get requests while displaying a toast depending on the state of the promise
 * @type T
 * @param getterFunction - Takes in a callback containing one of the 'GET' method api requests
 *
 * @returns An object in the form { data: T or null }
 */
const useGetData = <T extends unknown>(
  getterFunction: () => Promise<CustomResponse<T>>
): { data: T | null } => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getterFunction();

        if (Array.isArray(response.data) && response.data.length === 0) {
          toast.info("No data present");
        }

        if (response.error) {
          handleError(response.error);
        }

        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "Servers may be down. Try again later.");
          throw new Error(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return { data };
};

export default useGetData;
