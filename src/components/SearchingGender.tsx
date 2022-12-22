import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getData } from "../api/axios";

const options = [
  { value: "زن", label: "زن" },
  { value: "مرد", label: "مرد" },
];

const SearchingGender = ({ setFilterGender,apiSearch }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  };

  const fetchData = async () => {
    try {
      const link = apiSearch()
      console.log(link)
      const response = await getData(link, {
        params: {
          keyword: selectedOption,
        },
      });
      if (response.status === 200) {
        // console.log(response.data);
        setFilterGender(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedOption && fetchData();
  }, [selectedOption]);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">جنسیت</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedOption}
        onChange={handleGender}
      >
        {options.map((item) => {
          return (
            <FormControlLabel
              key={item.label}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default SearchingGender;
