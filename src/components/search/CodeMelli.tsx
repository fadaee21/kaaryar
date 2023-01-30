import { SearchField } from "../../styles/search/searchField";

interface CodeMelliType {
  codeMelliState: string;
  setCodeMelliState: React.Dispatch<React.SetStateAction<string>>;
}

const CodeMelli = ({ setCodeMelliState, codeMelliState }: CodeMelliType) => {
  return (
    <SearchField
      id="outlined-basic"
      label="کد ملی"
      variant="outlined"
      onChange={(e) => setCodeMelliState(e.target.value)}
      value={codeMelliState}
    />
  );
};

export default CodeMelli;
