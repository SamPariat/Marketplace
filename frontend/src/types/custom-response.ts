export type CustomResponse<T> = {
  data: T;
  message: string | null;
  error: string | null;
};
