import { Grid, Link, List, ListItem, ListItemText } from "@mui/material";
import { ShortCoreModule } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
import { convertArrToStr } from "../../../utils/courseMethod";

interface Prop {
  coreDetail: ShortCoreModule | undefined;
}

const CoreModuleCourseComp = ({ coreDetail }: Prop) => {
  const {
    category,
    teachingStatus,
    startDate,
    endDate,
    weblinkLmsCourse,
    description,
    name,
    careerPathway,
    instructors,
    weblinkFinalProject,
    studentCount,
    numberOfHours,
    deadlineFinalProject,
  } = coreDetail ?? {};
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText primary="نوع دوره" secondary={"دوره تخصصی"} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="گروه مرتبط"
              secondary={category?.groupCode}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="وضعیت آموزش دوره"
              secondary={teachingStatus}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تاریخ شروع"
              secondary={persianDate(startDate)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="محتوای دوره"
              secondary={
                weblinkLmsCourse ? (
                  <Link
                    href={`${weblinkLmsCourse}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    color="inherit"
                    underline="hover"
                  >
                    {weblinkLmsCourse}
                  </Link>
                ) : (
                  "-"
                )
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="ددلاین پروژه پایانی"
              secondary={deadlineFinalProject ?? "-"}
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary="تعداد مربیان حل تمرین فعال این دوره"
              secondary={instructorCount}
            />
          </ListItem> */}

          <ListItem>
            <ListItemText primary="توضیحات" secondary={description ?? "-"} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText primary="نام دوره" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="مسیر مرتبط"
              secondary={careerPathway?.name || "-"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="نام مدرس"
              secondary={
                instructors?.length ? convertArrToStr(instructors) : "-"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تاریخ پایان"
              secondary={endDate ? persianDate(endDate) : "-"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="پروژه پایانی"
              secondary={
                weblinkFinalProject ? (
                  <Link
                    href={`${weblinkFinalProject}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    color="inherit"
                    underline="hover"
                  >
                    {weblinkFinalProject}
                  </Link>
                ) : (
                  "-"
                )
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تعداد ساعات دوره"
              secondary={numberOfHours || "-"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تعداد مهارت‌آموزان این دوره"
              secondary={studentCount}
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary="تعداد منتورهای فعال این دوره"
              secondary={mentorCount}
            />
          </ListItem> */}
        </List>
      </Grid>
    </Grid>
  );
};

export default CoreModuleCourseComp;
