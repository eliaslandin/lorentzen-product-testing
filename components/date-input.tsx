"use client";

import { useInputControl } from "@conform-to/react";
import { DatePicker } from "./date-picker";
import { useEffect, useState } from "react";

export const DateInput = ({
  id,
  field,
  defaultValue,
}: {
  id: string;
  field: ReturnType<typeof useInputControl<string>>;
  defaultValue?: Date;
}) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (!date) {
      field.change(undefined);
    } else {
      const dateString = date.toISOString();
      field.change(dateString);
    }
  }, [date, field]);

  return <DatePicker defaultValue={defaultValue} setDateAction={setDate} />;
};
