import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { SelectBox } from "../../styles/addComment/formBox";

interface CommentingType {
  id: string;
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  allChoice: { message: string }[];
  description: string;
}

const Commenting: React.FC<CommentingType> = ({
  id,
  value,
  handleChange,
  allChoice,
  description,
}) => {
  
  return (
    <SelectBox>
      <Typography variant="body2" gutterBottom>
        {description}
      </Typography>
      <FormControl fullWidth>
        <Select
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        >
          {allChoice.map((item: any, i: any) => (
            <MenuItem key={i} value={item.message}>
              {item.message}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectBox>
  );
};

export default Commenting;
