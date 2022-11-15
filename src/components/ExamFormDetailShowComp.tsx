import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { ExamRegisterUser } from "../model";

interface ExamStudent {
  student: ExamRegisterUser | null;
}

const ExamFormDetailShowComp: React.FC<ExamStudent> = ({ student }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemText
          primary="نوع موسسه آموزشی آخرین مقطع تحصیلی"
          secondary={student?.instituteType}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="نام موسسه آموزشی آخرین مقطع تحصیلی"
          secondary={student?.lastInstitute}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="نوع موسسه فعلی"
          secondary={student?.currentInstType}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="نام موسسه فعلی"
          secondary={student?.currentInstName}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="رشته تحصیلی فعلی"
          secondary={student?.currentField}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="اگر دانشجو هستید در چه مقطعی هستید؟"
          secondary={student?.eduLevel}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="اگر دانشجو هستید در چه ترمی هستید؟"
          secondary={student?.stuSemester}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="اگر دانش آموز هستید سال چندم هستید؟"
          secondary={student?.stuYear}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="وضعیت فعلی اشتغال"
          secondary={student?.jobStatus}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="نوع اشتغال" secondary={student?.jobType} />
      </ListItem>
      <ListItem>
        <ListItemText primary="نوع و سمت شغلی" secondary={student?.jobTitle} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="چشم انداز شغلی دوسال آینده"
          secondary={student?.jobVision}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="متوسط حقوق ماهیانه"
          secondary={student?.avgSalary}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="وقت آزاد روزانه"
          secondary={student?.freeDailyTime}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="تعداد ساعت کاری" secondary={student?.workTime} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="مشغولیت فعلی در صورت عدم اشتغال"
          secondary={student?.noneJobActivation}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="آماده به کار"
          secondary={student?.jobStandby ? "بله" : "خیر"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="آشنایی با وب"
          secondary={student?.webDevFamiliarity ? "بله" : "خیر"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="آشنایی با کامپیوتر"
          secondary={student?.computerFamiliarity ? "بله" : "خیر"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="میزان دسترسی به کامپیوتر"
          secondary={student?.computerAccess}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="گذراندن دوره برنامه نویسی"
          secondary={student?.programmingCoursePassed ? "بله" : "خیر"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="توضیح دوره"
          secondary={student?.courseDescription}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="ابزار دسترسی به اینترنت"
          secondary={student?.internetAccess}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="ساعات دسترسی" secondary={student?.accessTime} />
      </ListItem>
      <ListItem>
        <ListItemText primary="محدودیت زمانی" secondary={student?.limitTime} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="انگیزه ورود به کاریار"
          secondary={student?.motivation}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="نحوه آشنایی با کاریار"
          secondary={student?.familiar}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="نام معرف/موسسه نیکوکاری"
          secondary={student?.charity}
        />
      </ListItem>
    </List>
  );
};

export default ExamFormDetailShowComp;
