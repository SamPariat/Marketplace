import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { CustomResponse } from "../../types/custom-response";
import { handleError } from "..";

/**
 * Custom hook for handling get requests while displaying a toast depending on the state of the promise
 * @param {() => Promise<CustomResponse<any>>} getterFunction - Takes in a callback containing one of the 'GET' method api requests
 *
 * @returns An object in the form { data: Array<any> or null }
 */
const useGetData = (
  getterFunction: () => Promise<CustomResponse<any>>
): { data: Array<any> | any | null } => {
  const [data, setData] = useState<Array<any> | any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await toast.promise(getterFunction, {
          pending: "Request pending...",
          success: "Found response",
          error: "Some error occurred",
        });

        if (response.error) {
          handleError(response.error);
        }

        setData(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new AxiosError(error.message);
        } else if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return { data };
};

export default useGetData;
