import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface Props {
  setVal: React.Dispatch<React.SetStateAction<string[]>>;
  studentResponse: string[] | undefined | null;
  label: string;
  identifier: string;
  options: string[];
}
const MultiSelection = ({
  setVal,
  studentResponse,
  label,
  identifier,
  options,
}: Props) => {
  const [checkBoxVal, setCheckBoxVal] = useState<string[]>(
    studentResponse || []
  );

  useEffect(() => {
    if (checkBoxVal.includes("همه موارد") || checkBoxVal.length === 6) {
      setCheckBoxVal(options);
    }
  }, [checkBoxVal, options]);

  const handleChangeCheckBox = useCallback(
    (value: string) => () => {
      const currentIndex = checkBoxVal.indexOf(value);
      const newChecked = [...checkBoxVal];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        if (checkBoxVal.includes("همه موارد")) {
          const i = newChecked.indexOf("همه موارد");
          newChecked.splice(i, 1);
        }

        newChecked.splice(currentIndex, 1);
      }
      setCheckBoxVal(newChecked);
      setVal(newChecked);
    },
    [checkBoxVal, setVal]
  );

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel htmlFor={identifier}>{label}</FormLabel>
      <FormGroup>
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkBoxVal.includes(item)}
                onChange={handleChangeCheckBox(item)}
              />
            }
            label={item}
            id={identifier}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultiSelection;
