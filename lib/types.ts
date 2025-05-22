import { ImageProps } from "next/image";

export type ServerErrorResponse = {
  data: null;
  error: string;
};

export type ServerSuccessResponse<T> = {
  error: null;
  data: T;
};

export type ImageOptionalProps = Omit<ImageProps, "src" | "alt">;
