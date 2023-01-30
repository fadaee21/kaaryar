import Select from "react-select";
interface StatusSearchType {
  setStatusState: React.Dispatch<React.SetStateAction<any>>;
  statusState?: any;
  stateWaiting: boolean | null;
  setStateWaiting: any;
}
const StatusSearch = ({
  setStatusState,
  statusState,
  stateWaiting,
  setStateWaiting
}: StatusSearchType) => {
  const options = [
    { value: true, label: "تایید شده" },
    { value: false, label: "رد شده" },
    { value: null, label: "در انتظار تایید" },
  ];

  function labelFunc(val: boolean | null) {
    switch (val) {
      case true:
        return "تایید شده";
      case false:
        return "رد شده";
      case null:
        return "در انتظار تایید";
    }
  }

  return (
    <Select
      value={
        stateWaiting
          ? { label: labelFunc(statusState), value: statusState }
          : null
      }
      options={options}
      placeholder="وضعیت"
      onChange={(e: any) => {
        setStatusState(e.value);
        setStateWaiting(true);
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
      }}
    />
  );
};

export default StatusSearch;
