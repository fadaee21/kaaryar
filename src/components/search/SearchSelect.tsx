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
      value={state ? { label: state, value: state } : null}
      maxMenuHeight={150}
      id={`select-${placeholder.substring(0, 2)}`}
      options={options}
      placeholder={placeholder}
      onChange={(e: any) => setState(e.value)}
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

export default SearchSelect;
