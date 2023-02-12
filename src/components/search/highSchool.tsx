import { SearchField } from "../../styles/search/searchField";

interface HighSchoolType {
  highSchool: string | null;
  setHighSchool: React.Dispatch<React.SetStateAction<string|null>>;
}

const HighSchool = ({ setHighSchool, highSchool }: HighSchoolType) => {
  return (
    <SearchField
      value={highSchool || ""}
      id="outlined-basic"
      label="سال دبیرستان"
      variant="outlined"
      onChange={(e) => setHighSchool(e.target.value)}
    />
  );
};

export default HighSchool;
