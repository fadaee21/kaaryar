import {
  // AccordionDetails,
  // Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { ModuleVolunteerProfile } from "../../../../model";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import {
//   AccordionStyled,
//   AccordionSummaryStyled,
// } from "../../../../styles/search/accordion";
import TableHeader from "../../../table/TableHeader";
import TableBodyModuleVolunteer from "./TableBodyModuleVolunteer";
// import { Link } from "react-router-dom";
import { moduleVolunteerTableHeader } from "../../../table/helper-header";
interface Props {
  modules: ModuleVolunteerProfile[];
  fullName: string;
  whoCanSeeComments: boolean;
  adminVisibility: boolean;
}
const ModulesVolunteer = ({
  whoCanSeeComments,
  modules,
  fullName,
  adminVisibility,
}: Props) => {
  // const [chevronDir, setChevronDir] = useState(false);
  // const [searchModulesVolunteer, setSearchModulesVolunteer] = useState<
  //   ModuleVolunteerProfile[] | null
  // >();
  return (
    <>
      {/* <AccordionStyled expanded={chevronDir}>
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
          </AccordionSummaryStyled> */}

      {/* <ExcelExport
              fileName={"Applicant Info"}
              searchData={[]}
              linkAll=""
              useIn="reg"
            /> */}
      {/* </Box>
        <AccordionDetails>
          <Box
            sx={{
              width: "100%",
              my: 3,
            }}
          > */}
      {/* //!component for searching student */}
      {/* <SearchAllCourse
          moduleSubType="workshop"
          moduleType="general"
          chevronDir={chevronDir}
          setSearchCourseCore={setSearchCourseWorkshop}
          settingResponse={SETTING_RESPONSE}
        /> */}
      {/* </Box>
        </AccordionDetails>
      </AccordionStyled> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHeader
            headerItems={
              moduleVolunteerTableHeader
              // whoCanSeeComments
              //   ? moduleVolunteerTableHeader
              //   : moduleVolunteerTableHeader.slice(0, -1)
            }
          />
          <TableBody>
            {/* {(searchModulesVolunteer ? searchModulesVolunteer : modules)?.map( */}
            {modules?.map((module, index) => (
              <TableBodyModuleVolunteer
                key={module.moduleId}
                moduleVolunteer={module}
                counter={index}
                // whoCanSeeComments={whoCanSeeComments}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //!for empty response of search return TableEmpty */}
      {/* {searchModulesVolunteer?.length === 0 && <TableEmpty />} */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        mt={6}
        gap={1}
      >
        {/* <Typography variant="body2">
          برای مشاهدهٔ تمام{" "}
          <Link to={"all-students"}> {`مهارت‌آموزان ${fullName}`}</Link> کلیک
          کنید.
        </Typography> */}
        {adminVisibility && (
          <>
            <Typography variant="body2">
              {`برای مشاهدهٔ <strong>تمام نظراتی</strong> که ${fullName} ثبت کرده
              است، از منوی سمت راست، به فهرست نظرات بروید و در بخش سرچ، نام این
              داوطلب را در فیلد «نظردهنده» انتخاب کنید.`}
            </Typography>
            {/* <Typography variant="body2">
              {`  برای مشاهدهٔ <strong>بازخوردهایی</strong> که در هر دوره در مورد
              ${fullName} ثبت شده است، به تب «بازخوردها» مراجعه کنید.`}
            </Typography> */}
          </>
        )}
      </Stack>
    </>
  );
};

export default ModulesVolunteer;
