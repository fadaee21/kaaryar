import { ApprovalStatus } from "../../model";
import Select from "react-select";
interface Prop {
  approvalStatus: ApprovalStatus;
  setApprovalStatus: React.Dispatch<React.SetStateAction<ApprovalStatus>>;
}

const StatusSearch = ({ approvalStatus, setApprovalStatus }: Prop) => {
  const options = [
    { value: "approved", label: "تایید شده" },
    { value: "rejected", label: "رد شده" },
    { value: "pending", label: "در انتظار تایید" },
  ];

  return (
    <Select
      value={
        approvalStatus ? options.find((i) => i.value === approvalStatus) : null
      }
      options={options}
      onChange={(selectedValue: any) => setApprovalStatus(selectedValue.value)}
      placeholder="وضعیت"
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
