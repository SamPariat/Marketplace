import { toast } from "react-toastify";
import { CustomResponse } from "../../types/custom-response";

import { handleError } from "..";

/**
 *
 * @type B The type of the body
 * @type C The type of the custom response wanted
 * @param patchFunction A function from the custom APIs
 * @returns An object in the form { patchData: (id: number, body: B) returning a promise of void }
 */
const usePatchData = <B extends unknown, C extends unknown>(
  patchFunction: (id: number, body: B) => Promise<CustomResponse<C>>
): { patchData: (id: number, body: B) => Promise<void> } => {
  const patchData = async (id: number, body: B) => {
    try {
      const response = await patchFunction(id, body);

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

  return { patchData };
};

export default usePatchData;
