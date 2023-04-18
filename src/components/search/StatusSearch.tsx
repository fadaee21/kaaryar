// import { ApprovalStatus } from "../../model";
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
      value={state ? statusOptions.find((i) => i.value === state) : null}
      options={statusOptions}
      onChange={(selectedValue: any) => setState(selectedValue.value)}
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

export default StatusSearch;
