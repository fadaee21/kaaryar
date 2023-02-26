import { Box, Button, Divider, List, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  BorderBox,
  BorderBox2,
  StartListItem,
  ListItemText1,
  ListItemText2,
  ListItemText3,
  ListItemText4,
  ListItemText5,
} from "../../../styles/graduate";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const GraduateProfileComp = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" gutterBottom>
            وضعیت فارغ‌التحصیلی احمد اکبری
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              // onClick={() => navigate(``)}
            >
              ارسال درخواست بازپرداخت
            </Button>
            <Button
              endIcon={<EditIcon />}
              variant="outlined"
              // onClick={() => navigate(``)}
            >
              ویرایش
            </Button>

            <Button
              endIcon={<ArrowBackIcon />}
              variant="outlined"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              بازگشت
            </Button>
          </Stack>
        </Box>
      </header>

      <main>
        <Stack direction="row" justifyContent="space-between" sx={{ mt:11 }}>
          <Stack sx={{ width: "49%" }}>
            <Typography variant="h6">مشخصات فردی</Typography>
            <BorderBox>
              <List>
                <StartListItem>
                  <ListItemText1 primary="مسیر آموزشی" />
                  <ListItemText2 primary="فرانت‌اند، امور اداری" />
                </StartListItem>
                <StartListItem>
                  <ListItemText1 primary="زمینه های شغلی درخواستی" />
                  <ListItemText2 primary="فرانت‌اند، برنامه‌نویسی، امور اداری، طراحی و فوتوشاپ، کال سنتر" />
                </StartListItem>
                <StartListItem>
                  <ListItemText1 primary="سطح زبان انگلیسی" />
                  <ListItemText2 primary="بالاتر از متوسط" />
                </StartListItem>
                <StartListItem>
                  <ListItemText1 primary="نوع کار درخواستی" />
                  <ListItemText2 primary="حضوری" />
                </StartListItem>
                <StartListItem>
                  <ListItemText1 primary="زمان کار درخواستی" />
                  <ListItemText2 primary="پاره‌وقت" />
                </StartListItem>
                <StartListItem>
                  <ListItemText1 primary="وضعیت اشتغال‌پذیری" />
                  <ListItemText2 primary="در انتظار کار" />
                </StartListItem>
              </List>
            </BorderBox>
          </Stack>
          <Stack sx={{ width: "49%" }}>
            <Typography variant="h6">
              وضعیت اشتغال در زمان فارغ‌التحصیلی
            </Typography>
            <BorderBox>
              <List>
                <StartListItem>
                  <ListItemText3 primary="وضعیت اشتغال در زمان فارغ‌التحصیلی" />
                  <ListItemText2 primary="اشتغال غیرمرتبط" />
                </StartListItem>
                <StartListItem>
                  <ListItemText3 primary="سمت شغلی" />
                  <ListItemText2 primary="چرخ‌کار" />
                </StartListItem>
                <StartListItem>
                  <ListItemText3 primary="نام کارفرما" />
                  <ListItemText2 primary="خیاطی نیلگون، آقای مسعودی" />
                </StartListItem>
                <StartListItem>
                  <ListItemText3 primary="شرایط کار" />
                  <ListItemText2 primary="پاره وقت/حضوری" />
                </StartListItem>
                <Divider variant="middle" sx={{ my: 3 }} />
                <Typography variant="body2" color={"#000"}>
                  توضیحات: با توجه به چندین سال سابقه در زمینه‌ی خیاطی، در زمان
                  آموزش و در زمان فارغ‌التحصیلی، مشغول به کار بودند.
                </Typography>
              </List>
            </BorderBox>
          </Stack>
        </Stack>
        <Stack sx={{ width: "100%",mt:9,mb:30 }}>
          <Stack direction="row" gap={3.5} alignItems="center">
            <Typography variant="h6">موقعیت‌های شغلی</Typography>
            <Button endIcon={<AddIcon />} variant="outlined">
              افزودن
            </Button>
          </Stack>
          <BorderBox2>
            <List>
              <StartListItem>
                <ListItemText5 primary="تاریخ ارسال پیشنهاد" />
                <ListItemText4 primary="۱۴۰۱/۱۰/۴" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="موقعیت شغلی پیشنهادی" />
                <ListItemText4 primary="کارآموزی" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="سمت شغلی پیشنهادی" />
                <ListItemText4 primary="کارآموزی فرانت‌اند" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="نام کارفرما" />
                <ListItemText4 primary="شرکت ارتباطات زیرساخت فناپ" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="شرایط کار" />
                <ListItemText4 primary="تمام وقت/حضوری" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="آخرین وضعیت" />
                <ListItemText4 primary="تایید نهایی" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="موقعیت شغلی پذیرش‌شده" />
                <ListItemText4 primary="کارآموزی" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="سمت شغلی پذیرش‌شده" />
                <ListItemText4 primary="کارآموز فرانت‌اند" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="تاریخ شروع به کار" />
                <ListItemText4 primary="۱۴۰۱/۱۱/۱" />
              </StartListItem>
              <StartListItem>
                <ListItemText5 primary="میزان حقوق" />
                <ListItemText4 primary="۵ میلیون تومان" />
              </StartListItem>
            </List>
          </BorderBox2>
        </Stack>
      </main>
    </>
  );
};

export default GraduateProfileComp;
