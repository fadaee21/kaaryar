import Select from "react-select";
interface StatusSearchType {
  setStatusState: React.Dispatch<React.SetStateAction<boolean | null>>;
}
const StatusSearch = ({ setStatusState }: StatusSearchType) => {
  const options = [
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
    { value: null, label: "در انتظار تایید" },
  ];

  return (
    <Select
      options={options}
      placeholder="وضعیت"
      onChange={(e: any) => setStatusState(e.value)}
    />
  );
};

export default StatusSearch;
