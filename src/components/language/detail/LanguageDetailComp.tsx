import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { ContentBox } from "../../../styles/examFormDetail";
import { DetailTypography } from "../../../styles/studentDetail";

const LanguageDetailComp = () => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <ContentBox>
      <DetailTypography variant="h6" sx={{ minWidth: "30%" }}>
        دوره زبان انگلیسی
      </DetailTypography>
      <Divider
        variant="middle"
        flexItem
        orientation={matches ? "vertical" : "horizontal"}
      />
      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary="نام سطج" secondary={"Elementary"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="گروه مرتبط" secondary={"05"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="نام مدرس" secondary={"هادی طباطبایی"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="تاریخ پایان" secondary={"-"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="تعداد مربیان حل تمرین فعال این دوره"
                secondary={"12"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="محتوای دوره" secondary={""} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary="نام دوره" secondary={"Elementary-1"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="وضعیت آموزش دوره"
                secondary={"در حال برگزاری"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="تاریخ شروع" secondary={"1402/02/01"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="تعداد مهارت‌آموزان این دوره"
                secondary={"31"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="تعداد منتورهای فعال این دوره"
                secondary={"12"}
              />
            </ListItem>

            <ListItem>
              <ListItemText primary="توضیحات" secondary={""} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </ContentBox>
  );
};

export default LanguageDetailComp;
