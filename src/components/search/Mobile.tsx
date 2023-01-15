import { SearchField } from "../../styles/search";

const Mobile = ({ setMobileState }: any) => {
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
