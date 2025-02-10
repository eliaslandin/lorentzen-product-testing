export type ServerErrorResponse = {
  data: null;
  error: string;
};

export type ServerSuccessResponse<T> = {
  error: null;
  data: T;
};
