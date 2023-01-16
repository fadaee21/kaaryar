import React from "react";
import { SearchField } from "../../styles/search/searchField";
interface SearchCityType {
  setCityState: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchCity = ({ setCityState }: SearchCityType) => {
  return (
    <SearchField
      id="outlined-basic"
      label="شهر"
      variant="outlined"
      onChange={(e) => setCityState(e.target.value)}
    />
  );
};

export default SearchCity;
