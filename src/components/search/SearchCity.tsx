import React from "react";
import { SearchField } from "../../styles/search/searchField";
interface SearchCityType {
  setCityState: React.Dispatch<React.SetStateAction<string>>;
  cityState: string;
}

const SearchCity = ({ setCityState, cityState }: SearchCityType) => {
  return (
    <SearchField
      value={cityState || ""}
      id="outlined-basic"
      label="شهر"
      variant="outlined"
      onChange={(e) => setCityState(e.target.value)}
    />
  );
};

export default SearchCity;
