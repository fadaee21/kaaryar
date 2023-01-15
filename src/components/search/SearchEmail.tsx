import { SearchField } from "../../styles/search";

const SearchEmail = ({ setEmailState }: any) => {
  return (
    <SearchField
      id="outlined-email"
      label="ایمیل"
      variant="outlined"
      onChange={(e) => setEmailState(e.target.value)}
      type="email"
    />
  );
};

export default SearchEmail;
