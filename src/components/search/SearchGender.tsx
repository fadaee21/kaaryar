import Select from "react-select";
interface SearchGenderType {
  setOutputGender: React.Dispatch<React.SetStateAction<any>>;
  outputGender: any;
}
const SearchGender = ({ setOutputGender, outputGender }: SearchGenderType) => {
  const options = [
    { value: "زن", label: "زن" },
    { value: "مرد", label: "مرد" },
  ];

  return (
    <Select
      value={outputGender ? { label: outputGender, value: outputGender } : null}
      options={options}
      placeholder="جنسیت"
      onChange={(e: any) => setOutputGender(e.value)}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
      }}
    />
  );
};

export default SearchGender;
