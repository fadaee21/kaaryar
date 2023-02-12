import { SearchField } from "../../styles/search/searchField";

interface RegisterCodeType {
  registerCode: string | null;
  setRegisterCode: React.Dispatch<React.SetStateAction<string|null>>;
}

const Registration = ({ setRegisterCode, registerCode }: RegisterCodeType) => {
  return (
    <SearchField
      value={registerCode || ""}
      id="outlined-basic"
      label="کد متقاضی"
      variant="outlined"
      onChange={(e) => setRegisterCode(e.target.value)}
    />
  );
};

export default Registration;
