import Select from "react-select";

type ValType = { value: number|string; label: string };
interface SearchType {
  setState: React.Dispatch<React.SetStateAction<ValType | null>>;
  state: ValType | null;
  options: ValType[] | undefined;
  placeholder: string;
}

const SelectiveSearchCourse = ({
  setState,
  state,
  options,
  placeholder,
}: SearchType) => {
  return (
    <Select
      value={state}
      maxMenuHeight={150}
      id={`select-${placeholder.substring(0, 2)}`}
      options={options}
      placeholder={placeholder}
      onChange={(e) => setState(e)}
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

export default SelectiveSearchCourse;
