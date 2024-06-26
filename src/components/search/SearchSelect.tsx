import { memo } from "react";
import Select from "react-select";

interface SearchType {
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  state: string | null;
  options: { label: string; value: string }[];
  placeholder: string;
}

const SearchSelect = ({
  setState,
  state,
  options,
  placeholder,
}: SearchType) => {
  return (
    <Select
      isClearable
      value={state ? { label: state, value: state } : null}
      maxMenuHeight={150}
      id={`select-${placeholder.substring(0, 2)}`}
      options={options}
      placeholder={placeholder}
      // onChange={(e: any) => setState(e.value)}
      onChange={(selectedOption) => {
        if (selectedOption === null) {
          setState(null);
        } else {
          setState(selectedOption.value);
        }
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
        menu: (provided) => ({ ...provided, zIndex: 2 }),
      }}
    />
  );
};

export default memo(SearchSelect);

export const EditBooleanSearch = memo(
  ({ placeholder, handleChange, value, options }: any) => {
    const content = (
      <Select
        isClearable
        value={value}
        onChange={handleChange}
        options={options}
        // getOptionLabel={(e) => e.label}
        // getOptionValue={(e) => e.value}
        placeholder={placeholder}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            height: "3rem",
          }),
          menu: (provided) => ({ ...provided, zIndex: 2 }),
        }}
      />
    );
    return content;
  }
);
// [
//   { value: true, label: "بله" },
//   { value: false, label: "خیر" },
// ]
