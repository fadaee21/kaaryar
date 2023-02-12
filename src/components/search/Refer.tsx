import { SearchField } from "../../styles/search/searchField";

interface ReferType {
  refer: string | null;
  setRefer: React.Dispatch<React.SetStateAction<string|null>>;
}

const Refer = ({ setRefer, refer }: ReferType) => {
  return (
    <SearchField
      value={refer || ""}
      id="outlined-basic"
      label="نام معرف یا موسسه"
      variant="outlined"
      onChange={(e) => setRefer(e.target.value)}
    />
  );
};

export default Refer;
