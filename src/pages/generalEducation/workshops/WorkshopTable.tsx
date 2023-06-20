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
import TableBodyWorksShops from "../../../components/generalCourse/workshops/TableBodyWorksShops";
import { workshops } from "../../../components/table/helper-header";
const WORKSHOP_LIST =
  "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at&hasCategory=false&moduleType=general&isImported=true&moduleSubType=workshop";

const WorkshopTable = () => {
  const [chevronDir, setChevronDir] = useState(false);

  const { data, isLoading, error } = useSWR<WorkshopShort[]>(
    WORKSHOP_LIST,
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
          <TableHeader headerItems={workshops} />
          <TableBody>
            {data?.map((workshops,index) => (
              <TableBodyWorksShops key={workshops.id} workshops={workshops} counter={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WorkshopTable;
