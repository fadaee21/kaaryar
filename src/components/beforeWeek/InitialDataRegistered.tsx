// import {
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
// } from "@mui/material";
// import React from "react";
// import { BeforeWeekType } from "../../model";
// import { BoxExamDetail } from "../../styles/examFormDetail";
// import { DetailTypography } from "../../styles/studentDetail";

// interface ExamStudent {
//   student: BeforeWeekType | null;
// }

// const InitialDataRegistered: React.FC<ExamStudent> = ({ student }) => {
//   const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
//   return (
//     <BoxExamDetail>
//       <DetailTypography variant="h6" sx={{ minWidth: "30%" }}>
//         فرم ثبت اطلاعات اولیه
//       </DetailTypography>
//       <Divider
//         variant="middle"
//         flexItem
//         orientation={matches ? "vertical" : "horizontal"}
//       />
//       <Grid container>
//         <Grid item xs={12} md={6}>
//           <List>
//             <ListItem>
//               <ListItemText
//                 primary="کد متقاضی :"
//                 secondary={student?.registrationForm.token}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="نام :"
//                 secondary={student?.registrationForm.firstName}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="نام خانوادگی :"
//                 secondary={student?.registrationForm.family}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="استان :"
//                 secondary={student?.registrationForm.province}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="شهر :"
//                 secondary={student?.registrationForm.city}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="دوره :"
//                 secondary={student?.registrationForm.course}
//               />
//             </ListItem>

           
//             <ListItem>
//               <ListItemText
//                 primary="سال دبیرستان :"
//                 secondary={student?.registrationForm.highSchoolYear}
//               />
//             </ListItem>

//             <ListItem>
//               <ListItemText
//                 primary="سال تولد :"
//                 secondary={student?.registrationForm.birthDate}
//               />
//             </ListItem>
//           </List>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <List>
//           <ListItem>
//               <ListItemText
//                 primary="نام معرف یا موسسه :"
//                 secondary={student?.registrationForm.refer}
//               />
//             </ListItem>
            
//             <ListItem>
//               <ListItemText
//                 primary="شماره همراه :"
//                 secondary={student?.registrationForm.mobile}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="ایمیل :"
//                 secondary={student?.registrationForm.email}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="نحوه آشنایی :"
//                 secondary={student?.registrationForm.familiarity}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="میزان تحصیلات :"
//                 secondary={student?.registrationForm.education}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="رشته تحصیلی :"
//                 secondary={student?.registrationForm.studyField}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="رشته انتخابی در کاریار :"
//                 secondary={student?.registrationForm.selectedField}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary="توضیحات سایر :"
//                 secondary={student?.registrationForm.description}
//               />
//             </ListItem>
//           </List>
//         </Grid>
//       </Grid>
//     </BoxExamDetail>
//   );
// };

// export default InitialDataRegistered;



const InitialDataRegistered = () => {
  return (
    <div>InitialDataRegistered</div>
  )
}

export default InitialDataRegistered