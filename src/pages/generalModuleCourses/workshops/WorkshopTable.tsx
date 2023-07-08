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
import style from "../../../styles/search/searchChevron.module.css";
import TableHeader from "../../../components/table/TableHeader";
import { useState } from "react";
import { WorkshopShort } from "../../../model";
import useSWR from "swr";
import LoadingProgress from "../../../components/LoadingProgress";
import TableBodyWorksShops from "../../../components/generalCourse/workshops/TableBodyWorksShops";
import { workshops } from "../../../components/table/helper-header";
import SearchAllCourse from "../../../components/search-course/SearchAllCourse";
import TableEmpty from "../../../components/table/TableEmpty";
const SETTING_RESPONSE = "&hasCategory=false&isImported=true";

const WORKSHOP_LIST = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=created_at&moduleType=general&moduleSubType=workshop${SETTING_RESPONSE}`;

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
    return <Typography>Error</Typography>;
  }

  return (
    <>
      <AccordionStyled>
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
          >
            <Typography variant="button">جستجو</Typography>
            <ExpandMoreIcon
              className={chevronDir ? style.rotate180 : style.rotate0}
            />
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
