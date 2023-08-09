import Select from "react-select";
import { DetailStudentStatus } from "../../model";

interface SearchType {
  setState: React.Dispatch<React.SetStateAction<DetailStudentStatus | null>>;
  state: DetailStudentStatus | null;
  options: DetailStudentStatus[];
  placeholder: string;
}

const SearchSelect2 = ({
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
      getOptionLabel={(e) => e.value}
      getOptionValue={(e) => e.id.toString()}
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

export default SearchSelect2;
