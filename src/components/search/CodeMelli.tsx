import { SearchField } from "../../styles/search";

const CodeMelli = ({ setCodeMelliState }: any) => {
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
