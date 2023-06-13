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

const WorkshopsDetailComp = () => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <ContentBox>
      <DetailTypography variant="h6" sx={{ minWidth: "30%" }}>
        کارگاه جانبی
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
              <ListItemText primary="نام کارگاه" secondary={"گیت"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="تاریخ شروع" secondary={"1402/02/01"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="تعداد ثبت‌نام‌کنندگان" secondary={"31"} />
            </ListItem>

            <ListItem>
              <ListItemText primary="توضیحات" secondary={""} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary="نام مدرس" secondary={"کیان شلیله"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="تاریخ پایان" secondary={"1402/02/01"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="محتوای کارگاه" secondary={""} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </ContentBox>
  );
};

export default WorkshopsDetailComp;
