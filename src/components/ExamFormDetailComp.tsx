import { Grid } from "@mui/material";
import React from "react";
import { ExamRegisterUser } from "../model";
import { DetailTypography } from "../styles/studentDetail";

interface ExamStudent {
  student: ExamRegisterUser|null;
}

const ExamFormDetailComp: React.FC<ExamStudent> = ({ student }) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          sm={8}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Grid container>
            <Grid item md={6}>
              <DetailTypography variant="body1">
                <b> نام : </b>
                {student?.registrationForm.firstName}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b> نام خانوادگی : </b>
                {student?.registrationForm.family}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b> کد ملی : </b>
                {student?.registrationForm.codeMeli}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b>جنسیت: </b>
                {student?.registrationForm.gender}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b> رشته تحصیلی : </b>
                {student?.registrationForm.studyField}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b>میزان تحصیلات: </b>
                {student?.registrationForm.education}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b>رشته انتخابی در کاریار: </b>
                {student?.registrationForm.selectedField}
              </DetailTypography>
            </Grid>
            <Grid item md={6}>
              <DetailTypography variant="body2">
                <b> سال تولد : </b>
                {student?.registrationForm.birthDate}
              </DetailTypography>
              <DetailTypography variant="body2">
                <b> ایمیل : </b>
                {student?.registrationForm.email}
              </DetailTypography>
              <DetailTypography variant="body2">
                <b> استان : </b>
                {student?.registrationForm.province}
              </DetailTypography>
              <DetailTypography variant="body2">
                <b> شهر : </b>
                {student?.registrationForm.city}
              </DetailTypography>
              <DetailTypography variant="body1">
                <b>نحوه آشنایی: </b>
                {student?.registrationForm.familiarity}
              </DetailTypography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DetailTypography variant="body2">
        <b> توضیحات سایر : </b>
        {student?.registrationForm.description}
      </DetailTypography>
    </>
  );
};

export default ExamFormDetailComp;
