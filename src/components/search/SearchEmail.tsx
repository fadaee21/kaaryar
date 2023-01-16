import { SearchField } from "../../styles/search/searchField";
interface SearchEmailType {
  setEmailState: React.Dispatch<React.SetStateAction<string | null>>;
}
const SearchEmail = ({ setEmailState }: SearchEmailType) => {
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
