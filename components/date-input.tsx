import { useInputControl } from "@conform-to/react";
import { DatePicker } from "./date-picker";

export const DateInput = ({
  id,
  field,
}: {
  id: string;
  field: ReturnType<typeof useInputControl<string>>;
}) => {
  return <DatePicker />;
};
