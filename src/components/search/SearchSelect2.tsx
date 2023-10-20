import Select from "react-select";
import { DetailStudentStatus } from "../../model";
import { memo } from "react";

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
  const getOptionLabel = (option: { value: string }) => option.value;
  const getOptionValue = (option: { id: { toString: () => string } }) =>
    option.id.toString();
  const handleChange = (selectedOption: DetailStudentStatus | null) =>
    setState(selectedOption);
  const customStyles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      height: "3rem",
    }),
    menu: (provided: any) => ({ ...provided, zIndex: 2 }),
  };
  const selectId = `select-${placeholder.substring(0, 2)}`;

  return (
    <Select
      isClearable
      value={state}
      maxMenuHeight={150}
      id={selectId}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      styles={customStyles}
    />
  );
};

export default memo(SearchSelect2);
