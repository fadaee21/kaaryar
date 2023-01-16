import { SearchField } from "../../styles/search/searchField";

interface CodeMelliType {
  setCodeMelliState: React.Dispatch<React.SetStateAction<string | null>>;
}

const CodeMelli = ({ setCodeMelliState }: CodeMelliType) => {
  return (
    <SearchField
      id="outlined-basic"
      label="کد ملی"
      variant="outlined"
      onChange={(e) => setCodeMelliState(e.target.value)}
    />
  );
};

export default CodeMelli;
