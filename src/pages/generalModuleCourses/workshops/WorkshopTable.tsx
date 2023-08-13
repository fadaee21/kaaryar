import {
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../../styles/search/accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableHeader from "../../../components/table/TableHeader";
import { useState } from "react";
import { WorkshopShort } from "../../../model";
import useSWR from "swr";
import LoadingProgress from "../../../components/LoadingProgress";
import TableBodyWorksShops from "../../../components/generalCourse/workshops/TableBodyWorksShops";
import { workshops } from "../../../components/table/helper-header";
import SearchAllCourse from "../../../components/search-course/SearchAllCourse";
import TableEmpty from "../../../components/table/TableEmpty";
import { handleError } from "../../../utils/handleError";
import { toast } from "react-toastify";
const SETTING_RESPONSE = "&hasCategory=false&isImported=true";

const WORKSHOP_LIST = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=start_date&moduleType=general&moduleSubType=workshop${SETTING_RESPONSE}`;

const WorkshopTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const [searchCourseWorkshop, setSearchCourseWorkshop] =
    useState<WorkshopShort[]>();
  const { data, isLoading, error } = useSWR<WorkshopShort[]>(WORKSHOP_LIST);

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    console.log(error);
    toast.error(handleError(error));
    return <Typography sx={{ mx: "auto" }}>Error Loading Page</Typography>;
  }

  return (
    <>
        <AccordionStyled expanded={chevronDir}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <AccordionSummaryStyled
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setChevronDir(!chevronDir)}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="button">جستجو</Typography>
              </AccordionSummaryStyled>

          {/* <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={[]}
                  linkAll=""
                  useIn="reg"
                /> */}
        </Box>
        <AccordionDetails>
          <Box
            sx={{
              width: "100%",
              my: 3,
            }}
          >
            {/* //!component for searching student */}
            <SearchAllCourse
              moduleSubType="workshop"
              moduleType="general"
              chevronDir={chevronDir}
              setSearchCourseCore={setSearchCourseWorkshop}
              settingResponse={SETTING_RESPONSE}
            />
          </Box>
        </AccordionDetails>
      </AccordionStyled>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          {searchCourseWorkshop?.length !== 0 && (
            <TableHeader headerItems={workshops} />
          )}
          <TableBody>
            {(searchCourseWorkshop ? searchCourseWorkshop : data)?.map(
              (workshops, index) => (
                <TableBodyWorksShops
                  key={workshops.id}
                  workshops={workshops}
                  counter={index}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //!for empty response of search return TableEmpty */}
      {searchCourseWorkshop?.length === 0 && <TableEmpty />}
    </>
  );
};

export default WorkshopTable;
