import { SearchField } from "../../styles/search/searchField";
interface SearchEmailType {
  setEmailState: React.Dispatch<React.SetStateAction<string>>;
  emailState: string;
}
const SearchEmail = ({ setEmailState, emailState }: SearchEmailType) => {
  return (
    <SearchField
      value={emailState || ""}
      id="outlined-email"
      label="ایمیل"
      variant="outlined"
      onChange={(e) => setEmailState(e.target.value)}
      type="email"
    />
  );
};

export default SearchEmail;
