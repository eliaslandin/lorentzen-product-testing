"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
} from "react";
import { removeProductAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";
import { ProductWithImage } from "@/lib/types";

export const RemoveProductButton = ({
  product,
  products,
  setSelectedAction,
}: {
  product: ProductWithImage;
  products: ProductWithImage[];
  setSelectedAction: Dispatch<SetStateAction<ProductWithImage | null>>;
}) => {
  const [state, formAction, isPending] = useActionState(
    removeProductAction,
    null,
  );

  if (state?.error) {
    throw new Error(state.error);
  }

  const selectPreviousProduct = () => {
    const prodIdx = products.indexOf(product);
    const isFirstInList = prodIdx === 0;

    if (products.length === 1) {
      setSelectedAction(null);
    } else if (isFirstInList) {
      setSelectedAction(products[prodIdx + 1]);
    } else {
      setSelectedAction(products[prodIdx - 1]);
    }
  };

  const handleClick = () => {
    startTransition(() => {
      formAction({ id: product.id });
      selectPreviousProduct();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Ta bort"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="w-5 h-5 text-foreground" />
      ) : (
        <TrashIcon className="w-5 h-5 transition-colors" />
      )}
    </Button>
  );
};
