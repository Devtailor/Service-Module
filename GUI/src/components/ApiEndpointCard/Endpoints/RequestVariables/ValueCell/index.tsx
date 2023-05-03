import { Row } from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormAutocomplete } from "../../../..";
import { RequestVariablesRowData, RequestVariablesTableColumns } from "../../../../../types/request-variables";

type ValueCellProps = {
  row: Row<RequestVariablesTableColumns>;
  requestValues: string[];
  value: string;
  rowData?: RequestVariablesRowData;
  updateRowValue: (id: string, value: string) => void;
};

const ValueCell: React.FC<ValueCellProps> = ({ row, requestValues, updateRowValue, rowData, value }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO figure out a way to support tabs
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        if (value !== inputValue) updateRowValue(row.id, inputValue);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, inputValue]);

  if (!rowData) return <></>;
  if (rowData.type === "schema" || (rowData.type === "array" && rowData.arrayType === "schema")) return <></>;
  return (
    <div ref={ref}>
      <FormAutocomplete
        placeholder={t("global.choose")}
        data={requestValues}
        value={inputValue}
        onChange={(v: string) => setInputValue(v)}
        onSelected={(v) => {
          setInputValue(v);
          updateRowValue(row.id, v);
        }}
        excludeCharacters={new RegExp(/[{}]/)}
      />
    </div>
  );
};

export default ValueCell;
