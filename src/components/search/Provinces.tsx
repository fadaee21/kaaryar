import Select from "react-select";
interface SearchProvincesType {
  setProvincesState: React.Dispatch<React.SetStateAction<string>>;
  provincesState: String;
}

const SearchProvinces = ({
  setProvincesState,
  provincesState,
}: SearchProvincesType) => {
  const options = [
    { value: "آذربایجان شرقی", label: "آذربایجان شرقی" },
    { value: "آذربایجان غربی", label: "آذربایجان غربی" },
    { value: "اردبیل", label: "اردبیل" },
    { value: "البرز", label: "البرز" },
    { value: "ایلام", label: "ایلام" },
    { value: "بوشهر", label: "بوشهر" },
    { value: "تهران", label: "تهران" },
    { value: "چهارمحال و بختیاری", label: "چهارمحال و بختیاری" },
    { value: "خراسان جنوبی", label: "خراسان جنوبی" },
    { value: "خراسان رضوی", label: "خراسان رضوی" },
    { value: "خراسان شمالی", label: "خراسان شمالی" },
    { value: "خوزستان", label: "خوزستان" },
    { value: "زنجان", label: "زنجان" },
    { value: "سمنان", label: "سمنان" },
    { value: "سیستان و بلوچستان", label: "سیستان و بلوچستان" },
    { value: "فارس", label: "فارس" },
    { value: "قزوین", label: "قزوین" },
    { value: "قم", label: "قم" },
    { value: "کردستان", label: "کردستان" },
    { value: "کرمان", label: "کرمان" },
    { value: "کرمانشاه", label: "کرمانشاه" },
    { value: "کهگیلویه و بویراحمد", label: "کهگیلویه و بویراحمد" },
    { value: "گلستان", label: "گلستان" },
    { value: "گیلان", label: "گیلان" },
    { value: "مازندران", label: "مازندران" },
    { value: "مرکزی", label: "مرکزی" },
    { value: "هرمزگان", label: "هرمزگان" },
    { value: "همدان", label: "همدان" },
    { value: "یزد", label: "یزد" },
  ];

  return (
    <Select
      value={
        provincesState ? { label: provincesState, value: provincesState } : null
      }
      maxMenuHeight={150}
      options={options}
      placeholder="استان"
      onChange={(e: any) => setProvincesState(e.value)}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
      }}
    />
  );
};

export default SearchProvinces;
