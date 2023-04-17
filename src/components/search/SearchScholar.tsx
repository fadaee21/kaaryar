import React from "react";
import Select from "react-select";
import { scholarOptions } from "./searchOptions";

interface SearchType {
  setState: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: boolean;
    } | null>
  >;
  state: { label: string; value: boolean } | null;
  placeholder: string;
}

export default function SearchScholar({
  state,
  setState,
  placeholder,
}: SearchType) {
  const handleChange = (option: any) => {
    setState(option);
  };

  return (
    <Select
      options={scholarOptions}
      value={state ? state : null}
      onChange={handleChange}
      placeholder={placeholder}
      id={`select-${placeholder.substring(0, 2)}`}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
        menu: (provided) => ({ ...provided, zIndex: 2 }),
      }}
    />
  );
}
