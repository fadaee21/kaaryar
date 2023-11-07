import { Box, Grid, List, ListItem, ListItemText } from "@mui/material";
import { persianDate } from "../../../utils/persianDate";
import { ModuleGroup } from "../../../model";
import { ListButton } from "../../../styles/Button";
import { useNavigate } from "react-router-dom";
interface Props {
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
  name: string;
  groupCode: string;
  description: string;
  startDate: string;
  endDate: string;
  modules: ModuleGroup[];
}

const GroupDetailShowComp = ({
  startDate,
  groupCode,
  studentCount,
  mentorCount,
  description,
  name,
  endDate,
  teachingAssistantCount,
  modules,
}: Props) => {
  const navigate = useNavigate()
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText primary="شماره گروه" secondary={groupCode} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تاریخ شروع آموزش"
              secondary={persianDate(startDate)}
            />
          </ListItem>
          <ListItem>
            <ListButton onClick={() => navigate("students")} >
            <ListItemText
              primary="تعداد کل مهارت‌آموزان این گروه"
              secondary={
                <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  {studentCount}
                  {/* <Button sx={{ ml: 3 }} variant="contained" size="small">
                    مشاهده
                  </Button> */}
                </Box>
              }
            />
            </ListButton>
          </ListItem>
          <ListItem>
          <ListButton onClick={() => navigate("mentor")}>
            <ListItemText
              primary="تعداد منتورهای فعال این گروه"
              secondary={
                <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  {mentorCount}
                  {/* <Button sx={{ ml: 3 }} variant="contained" size="small">
                    مشاهده
                  </Button> */}
                </Box>
              }
            />
          </ListButton>
          </ListItem>
          {/* <ListItem>
                <ListItemText primary="وضعیت آموزش مهارت‌آموزان" secondary={""} />
              </ListItem> */}
          <ListItem>
            <ListItemText primary="توضیحات" secondary={description} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText primary="نام گروه" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تاریخ پایان آمورش"
              secondary={persianDate(endDate)}
            />
          </ListItem>
          <ListItem>
            <ListButton onClick={() => navigate("ta")}>
              <ListItemText
                primary="تعداد مربیان حل تمرین فعال این گروه"
                secondary={
                  teachingAssistantCount
                  // <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  //   {teachingAssistantCount}
                  //   <Button sx={{ ml: 3 }} variant="contained" size="small">
                  //     مشاهده
                  //   </Button>
                  // </Box>
                }
              />
            </ListButton>
          </ListItem>
          <ListItem>
            <ListButton onClick={() => navigate("modules")}>
              <ListItemText
                primary="دوره‌های آموزشی برگزارشده در این گروه"
                secondary={modules.length}
              />
            </ListButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default GroupDetailShowComp;
