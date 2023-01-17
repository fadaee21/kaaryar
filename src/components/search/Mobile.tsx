import { SearchField } from "../../styles/search/searchField";

interface MobileType {
  setMobileState: React.Dispatch<React.SetStateAction<string | null>>;
}

const Mobile = ({ setMobileState }: MobileType) => {
  return (
    <SearchField
      id="outlined-basic"
      label="شماره موبایل"
      variant="outlined"
      onChange={(e) => setMobileState(e.target.value)}
    />
  );
};

export default Mobile;
