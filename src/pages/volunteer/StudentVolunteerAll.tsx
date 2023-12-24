// import Container from "@mui/material/Container";
// import useSWR, { mutate } from "swr";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import LoadingProgress from "../../components/LoadingProgress";
// import { Profile, StudentsVolunteer } from "../../model";
// import { toast } from "react-toastify";
// import { handleError } from "../../utils/handleError";
// import StudentVolunteerRowComp from "../../components/volunteer/VolunteerDetailComp/student-volunteer/StudentVolunteerRowComp";
// import {
//   Button,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableContainer,
//   Typography,
// } from "@mui/material";
// import TableHeader from "../../components/table/TableHeader";
// import { volunteerStudentTableHeader } from "../../components/table/helper-header";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useAuth } from "../../context/AuthProvider";
// import { useEffect } from "react";

// const StudentVolunteerAll = () => {
//   const { username } = useParams();
//   const {
//     adminVisibility,
//     auth: { username: loggerUserName },
//   } = useAuth();
//   const {
//     data: dataCall,
//     isLoading: loadingCall,
//     error: errorCall,
//   } = useSWR<StudentsVolunteer[]>(
//     `/user/profile/username/${username}/students`
//   );
//   const secondFetchKey = dataCall
//     ? `user/profile/${dataCall[0].personnelId}`
//     : null;
//   const {
//     data: newData,
//     isLoading: loadingNewData,
//     error: errorNewData,
//   } = useSWR<Profile>(
//     secondFetchKey
//     // You can specify a fetch function here if needed
//   );
//   useEffect(() => {
//     // Refetch the second data when the dataCall changes
//     if (dataCall) {
//       // Trigger a revalidation for the second fetch
//       mutate(secondFetchKey);
//     }
//   }, [dataCall, secondFetchKey]);

//   const navigate = useNavigate();
//   if (loadingCall || loadingNewData) {
//     return <LoadingProgress />;
//   }
//   if (errorCall) {
//     toast.error(handleError(errorCall));
//     return <Navigate to="/" replace />;
//   }
//   if (errorNewData) {
//     toast.error(handleError(errorNewData));
//   }

//   const whoCanSeeCommentField = adminVisibility || username === loggerUserName;

//   return (
//     <Container maxWidth="xl">
//       <header>
//         <Stack direction="row" sx={{ alignItems: "center", height: 100 }}>
//           <Stack sx={{ mr: "auto" }}>
//             <Typography variant="h5">{`${newData?.firstName} ${newData?.lastName} > مهارت‌آموزان`}</Typography>
//           </Stack>
//           <Button
//             variant="outlined"
//             sx={{ px: 5 }}
//             color="inherit"
//             endIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//           >
//             بازگشت
//           </Button>
//         </Stack>
//       </header>
//       {/* <AccordionStyled expanded={chevronDir}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//             mb: 1.5,
//           }}
//         >
//           <AccordionSummaryStyled
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//             onClick={() => setChevronDir(!chevronDir)}
//             expandIcon={<ExpandMoreIcon />}
//           >
//             <Typography variant="button">جستجو</Typography>
//           </AccordionSummaryStyled> */}
//       {/* <ExcelExport
//                 fileName={"Applicant Info"}
//                 linkAll="/user/profile/all?pageNum=1&pageSize=10000?pageNum=1&pageSize=100"
//                 searchData={null}
//                 useIn="volunteer"
//               /> */}
//       {/* </Box>
//         <AccordionDetails> */}
//       {/* //!component for searching student */}
//       {/* <Box
//             sx={{
//               width: "100%",
//               my: 3,
//             }}
//           > */}
//       {/* <SearchVolunteer
//                 setSearchingVolunteer={setSearchingVolunteer}
//                 chevronDir={chevronDir}
//               /> */}
//       {/* </Box>
//         </AccordionDetails>
//       </AccordionStyled> */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 400 }} aria-label="simple table">
//           <TableHeader
//             headerItems={volunteerStudentTableHeader
//               // whoCanSeeCommentField
//               //   ? volunteerStudentTableHeader
//               //   : volunteerStudentTableHeader.slice(0, -1)
//             }
//           />

//           <TableBody>
//             {dataCall?.map((item: StudentsVolunteer, inx) => {
//               const { student, enrollment, module } = item;
//               const { firstName, family, registrationForm } = student;
//               const { category, teachingStatus, name: moduleName } = module;
//               const { assignedMentor, assignedTA, assessment } = enrollment;
//               return (
//                 <StudentVolunteerRowComp
//                   key={inx}
//                   counter={inx + 1}
//                   assignedMentorFullName={
//                     assignedMentor
//                       ? assignedMentor.firstName + " " + assignedMentor.family
//                       : "-"
//                   }
//                   assignedTaFullName={
//                     assignedTA
//                       ? assignedTA.firstName + " " + assignedTA.family
//                       : "-"
//                   }
//                   categoryName={category?.name}
//                   careerPathwayName={module?.careerPathway?.name}
//                   finalAssessmentValue={assessment?.finalAssessment?.value}
//                   finalGrade={assessment?.finalGrade}
//                   city={registrationForm?.city}
//                   province={registrationForm?.province}
//                   refer={registrationForm?.refer}
//                   studentFullName={`${firstName} ${family}`}
//                   teachingStatus={teachingStatus}
//                   moduleName={moduleName}
//                   // whoCanSeeCommentField={whoCanSeeCommentField}
//                 />
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default StudentVolunteerAll;

const StudentVolunteerAll = () => {
  return <div>StudentVolunteerAll</div>;
};

export default StudentVolunteerAll;
