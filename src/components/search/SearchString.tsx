import { SearchField } from "../../styles/search/searchField";
interface SearchType {
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  state: string | null;
  label: string;
}
const SearchString = ({ setState, state, label }: SearchType) => {
  return (
    <SearchField
      value={state || ""}
      id={`outlined-${label.substring(0, 2)}`}
      label={label}
      variant="outlined"
      onChange={(e) => setState(e.target.value)}
      type="search"
    />
  );
};

export default SearchString;
