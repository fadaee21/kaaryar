import { Grid, Link, List, ListItem, ListItemText } from "@mui/material";
import { ShortCoreModule } from "../../model";
import { persianDate } from "../../utils/persianDate";
import { convertArrToStr, getTitle } from "../../utils/courseMethod";

interface Prop {
  workshopDetail: ShortCoreModule | undefined;
}

const GeneralDetailComp = ({ workshopDetail }: Prop) => {
  const {
    startDate,
    endDate,
    weblinkLmsCourse,
    description,
    name,
    instructors,
    studentCount,
    numberOfHours,
    weblinkFeedbackForm,
    subType,
    teachingStatus,
    category,
  } = workshopDetail ?? {};

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText
              primary="نوع دوره"
              secondary={`دوره عمومی: ${getTitle(subType)}`}
            />
          </ListItem>
          {subType !== "workshop" && (
            <>
              <ListItem>
                <ListItemText
                  primary="وضعیت دوره"
                  secondary={teachingStatus || "-"}
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
                  primary="تاریخ پایان"
                  secondary={persianDate(endDate)}
                />
              </ListItem>
            </>
          )}
          {subType === "workshop" && (
            <ListItem>
              <ListItemText
                primary="تاریخ برگزاری"
                secondary={persianDate(startDate)}
              />
            </ListItem>
          )}

          <ListItem>
            <ListItemText
              primary={
                subType === "workshop"
                  ? "تعداد شرکت‌کنندگان"
                  : "تعداد مهارت‌آموزان"
              }
              secondary={studentCount || "-"}
            />
          </ListItem>

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
              primary="نام مدرس"
              secondary={
                instructors?.length ? convertArrToStr(instructors) : "-"
              }
            />
          </ListItem>
          {(subType === "vocational_skills" ||
            subType === "interpersonal_skills") && (
            <ListItem>
              <ListItemText
                primary="گروه مرتبط"
                secondary={
                  category?.name
                    ? `${category?.groupCode} - ${category?.name}`
                    : "-"
                }
              />
            </ListItem>
          )}
          <ListItem>
            <ListItemText
              primary="تعداد ساعات دوره"
              secondary={numberOfHours || "-"}
            />
          </ListItem>
          {subType !== "english_module" && (
            <ListItem>
              <ListItemText
                primary="بازخوردها"
                secondary={
                  weblinkFeedbackForm ? (
                    <Link
                      href={`${weblinkFeedbackForm}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      color="inherit"
                      underline="hover"
                    >
                      {weblinkFeedbackForm}
                    </Link>
                  ) : (
                    "-"
                  )
                }
              />
            </ListItem>
          )}

          {subType !== "interpersonal_skills" && (
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
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default GeneralDetailComp;
