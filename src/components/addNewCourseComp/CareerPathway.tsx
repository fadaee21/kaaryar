import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useSWR from "swr";
interface Props {
  careerPathwayId: string;
  setCareerPathwayId: React.Dispatch<React.SetStateAction<string>>;
  errMsg: boolean;
  label: string;
  disabled?: boolean;
  helperText?: string;
}
export interface RelatedPath {
  name: string;
  id: number;
}
export const RELATED_PATH =
  "/modules/career-pathways/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=id";
const CareerPathway = ({
  careerPathwayId,
  setCareerPathwayId,
  errMsg,
  label,
  disabled = false,
  helperText,
}: Props) => {
  const { data, isLoading } = useSWR<RelatedPath[]>(RELATED_PATH);
  return (
    <FormControl
      disabled={(!data && isLoading) || disabled}
      fullWidth
      error={!careerPathwayId && errMsg}
    >
      <InputLabel id="careerPathwayId-label">{label}</InputLabel>
      <Select
        labelId="careerPathwayId-label"
        id="careerPathwayId"
        value={careerPathwayId}
        label={label}
        onChange={(e) => setCareerPathwayId(e.target.value.toString())}
      >
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}{" "}
    </FormControl>
  );
};

export default CareerPathway;
