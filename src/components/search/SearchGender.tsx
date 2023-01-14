import Select from "react-select";

const SearchGender = ({ setOutputGender }: any) => {
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
