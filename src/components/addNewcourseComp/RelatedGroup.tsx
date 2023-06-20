import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { fetcherGet } from "../../api/axios";
import { GroupArray } from "../../model";

interface Prop {
  errMsg: string;
  state: string | undefined;
  setState: (state: string | undefined) => void;
}

const RelatedGroup = ({ errMsg, state, setState }: Prop) => {
  const { data } = useSWR<GroupArray>(
    "/modules/categories/short-details/all",
    fetcherGet
  );
  console.log(state);
  return (
    <FormControl fullWidth error={!state && !!errMsg}>
      <InputLabel id="related-group-label">گروه مرتبط</InputLabel>
      <Select
        labelId="related-group-label"
        id="related-group"
        label="گروه مرتبط"
        onChange={(e) => setState(e.target.value)}
        defaultValue={state}
        value={state !== undefined ? state : ""}//for handling the uncontrolled component error
      >
        {data?.map(({ name, groupCode, id }) => (
          <MenuItem key={id} value={id}>
            {groupCode} - {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RelatedGroup;
