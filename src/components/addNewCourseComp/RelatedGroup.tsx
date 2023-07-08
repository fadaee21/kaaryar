import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useSWR from "swr";
import { GroupArray } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Navigate } from "react-router-dom";
interface Prop {
  errMsg: boolean;
  state: string | undefined;
  setState: (state: string | undefined) => void;
}

const RelatedGroup = ({ errMsg, state, setState }: Prop) => {
  const { data, isLoading, error } = useSWR<GroupArray>(
    "/modules/categories/short-details/all"
  );

   if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <>
      {!isLoading && (
        <FormControl fullWidth error={!state && errMsg}>
          <InputLabel id="related-group-label">گروه مرتبط</InputLabel>
          <Select
            labelId="related-group-label"
            id="related-group"
            label="گروه مرتبط"
            onChange={(e) => setState(e.target.value)}
            defaultValue={state}
            value={state !== undefined ? state : ""} //for handling the uncontrolled component error
          >
            {data?.map(({ name, groupCode, id }) => (
              <MenuItem key={id} value={id}>
                {groupCode} - {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default RelatedGroup;
