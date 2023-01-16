import Select from "react-select";
interface SearchGenderType {
  setOutputGender: React.Dispatch<React.SetStateAction<string | null>>;
}
const SearchGender = ({ setOutputGender }: SearchGenderType) => {
  const options = [
    { value: "زن", label: "زن" },
    { value: "مرد", label: "مرد" },
  ];

  return (
    <Select
      options={options}
      placeholder="جنسیت"
      onChange={(e: any) => setOutputGender(e.value)}
    />
  );
};

export default SearchGender;
