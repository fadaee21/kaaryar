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
import { fetcherGet } from "../../../api/axios";
import { WorkshopShort } from "../../../model";
import useSWR from "swr";
import LoadingProgress from "../../../components/LoadingProgress";
import { vocational } from "../../../components/table/helper-header";
import TableBodyVocational from "../../../components/generalCourse/vocational-interpersonal/TableBodyVocational";
const INTERPERSONAL_LIST =
  "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at&hasCategory=true&moduleType=general&moduleSubType=vocational_skills";

const VocationalTable = () => {
  const [chevronDir, setChevronDir] = useState(false);

  const { data, isLoading, error } = useSWR<WorkshopShort[]>(
    INTERPERSONAL_LIST,
    fetcherGet
  );

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
            {/* <SearchAll
                      setSearchingStudentRegister={setSearchingStudentRegister}
                      searchPage="reg"
                      chevronDir={chevronDir}
                      stateWaiting={stateWaiting}
                      setStateWaiting={setStateWaiting}
                      statusState={statusState}
                      setStatusState={setStatusState}
                    /> */}
          </Box>
        </AccordionDetails>
      </AccordionStyled>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHeader headerItems={vocational} />
          <TableBody>
            {data?.map((vocational, index) => (
              <TableBodyVocational
                key={vocational.id}
                vocational={vocational}
                counter={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VocationalTable;
