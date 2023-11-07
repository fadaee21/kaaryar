// import { ApprovalStatus } from "../../model";
import { memo } from "react";
import Select from "react-select";
// import { statusOptions } from "./searchOptions";
interface Prop {
  statusOptions: { label: string; value: string }[];
  state: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder: string;
}

const StatusSearch = ({
  state,
  setState,
  statusOptions,
  placeholder,
}: Prop) => {
  return (
    <Select
      isClearable
      value={state ? statusOptions.find((i) => i.value === state) : null}
      options={statusOptions}
      onChange={(selectedOption) => {
        if (selectedOption === null) {
          setState(null);
        } else {
          setState(selectedOption.value);
        }
      }}
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
};

export default memo(StatusSearch);
