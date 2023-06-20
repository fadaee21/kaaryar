import { Box, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { persianDate } from "../../../utils/persianDate";
interface Props {
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  groupCode: string;
  description: string;
  startDate: string;
  endDate: string;
}

const GroupDetailShowComp = ({
  startDate,
  groupCode,
  studentCount,
  mentorCount,
  description,
  name,
  endDate,
  teachingAssisstantCount,
}: Props) => {
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
            <ListItemText
              primary="تعداد کل مهارت‌آموزان این گروه"
              secondary={
                <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  {studentCount}
                  <Button sx={{ ml: 3 }} variant="contained" size="small">
                    مشاهده
                  </Button>
                </Box>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="تعداد منتورهای فعال این گروه"
              secondary={
                <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  {mentorCount}
                  <Button sx={{ ml: 3 }} variant="contained" size="small">
                    مشاهده
                  </Button>
                </Box>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText primary="وضعیت آموزش مهارت‌آموزان" secondary={""} />
          </ListItem>
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
            <ListItemText
              primary="تعداد مربیان حل تمرین فعال این گروه"
              secondary={
                <Box component={"span"} sx={{ mt: 1, display: "inline-block" }}>
                  {teachingAssisstantCount}
                  <Button sx={{ ml: 3 }} variant="contained" size="small">
                    مشاهده
                  </Button>
                </Box>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="دوره‌های آموزشی برگزارشده در این گروه"
              secondary={
                <Button sx={{ mt: 1 }} variant="contained" size="small">
                  مشاهده
                </Button>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default GroupDetailShowComp;
