import { SearchField } from "../../styles/search/searchField";

interface MobileType {
  mobileState: string;
  setMobileState: React.Dispatch<React.SetStateAction<string>>;
}

const Mobile = ({ setMobileState, mobileState }: MobileType) => {
  return (
    <SearchField
      value={mobileState || ""}
      id="outlined-basic"
      label="شماره موبایل"
      variant="outlined"
      onChange={(e) => setMobileState(e.target.value)}
    />
  );
};

export default Mobile;
