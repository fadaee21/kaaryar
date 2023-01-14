import Select from "react-select";

const StatusSearch = ({ setStatusState }: any) => {
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
