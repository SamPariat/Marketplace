import { toast } from "react-toastify";

import { handleError } from "..";
import { CustomResponse } from "../../types/custom-response";

/**
 *
 * @type T The type of the CustomResponse
 * @type B The type of the request body
 * @param postFunction A function from the custom APIs
 * @returns An object in the form { postData: (body: B) returning a Promise of type void }
 */
const usePostData = <T extends unknown, B extends unknown>(
  postFunction: (body: B) => Promise<CustomResponse<T>>
): { postData: (body: B) => Promise<void> } => {
  const postData = async (body: B) => {
    try {
      const response = await postFunction(body);

      if (response.error) {
        handleError(response.error);
      }

      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Servers may be down. Try again later.");
        throw new Error(error.message);
      }
    }
  };

  return { postData };
};

export default usePostData;
