import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { deepOrange } from "@mui/material/colors";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  BorderBox,
  BorderBoxAbout,
  ListIcon,
  ListText,
} from "../../styles/volunteer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const VolunteerDetail = () => {
  const navigate = useNavigate();
  const {
    auth: { roles },
  } = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container maxWidth="lg">
      <header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 3,
            mb: 10,
            ...(matches
              ? { flexDirection: "row" }
              : { flexDirection: "column" }),
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>
            PIC
          </Avatar>
          <Box sx={{ mr: "auto" }}>
            <Typography variant="h5" gutterBottom>
              هما فکری
            </Typography>
            <Typography variant="h6" fontWeight={400}>
              {/* role+کاریار */}
              منتور کاریار
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button //TODO:don't show for all
              endIcon={<EditIcon />}
              variant="outlined"
              onClick={() => navigate(`/${roles}/profile`)}
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
        <Typography variant="h6">درباره من</Typography>
        <BorderBoxAbout>
          <Typography variant="body2">متن معرفی</Typography>
        </BorderBoxAbout>
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 22 }}
        >
          <Stack sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <PersonOutlineOutlinedIcon />
              <Typography variant="h6">مشخصات فردی</Typography>
            </Stack>
            <BorderBox>
              <List>
                <ListItem>
                  <ListText primary="متولد ۱۳۷۴" />
                </ListItem>
                <ListItem>
                  <ListText primary="ساکن ایران، کرج" />
                </ListItem>
                <ListItem>
                  <ListText primary="09351234567" />
                </ListItem>
                <ListItem>
                  <ListText primary="email@gmail.com" />
                </ListItem>
              </List>
            </BorderBox>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <SchoolOutlinedIcon />
              <Typography
                variant="h6"
                sx={{ whiteSpace: "nowrap", width: "fit-content" }}
              >
                مشخصات تحصیلی و شغلی
              </Typography>
            </Stack>
            <BorderBox>
              <List>
                <ListItem>
                  <ListText primary="کارشناسی علوم کامپیوتر" />
                </ListItem>
                <ListItem>
                  <ListText primary="دانشگاه تهران" />
                </ListItem>
                <ListItem>
                  <ListText primary="طراح محصول در شرکت اسنپ" />
                </ListItem>
              </List>
            </BorderBox>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <LanguageIcon />
              <Typography variant="h6">لینک‌های مرتبط</Typography>
            </Stack>
            <BorderBox
              sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
            >
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LanguageIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="وب‌سایت" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <GitHubIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="GitHub" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LinkIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="Research Gate" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LinkIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="Google Scholar" />
                  </ListItemButton>
                </ListItem>
              </List>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LinkedInIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="LinkedIn" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LinkIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="GitLab" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/#"
                    sx={{ ":hover": { backgroundColor: "transparent" } }}
                  >
                    <ListIcon>
                      <LinkIcon sx={{ fontSize: 20 }} />
                    </ListIcon>
                    <ListText primary="Portfolio" />
                  </ListItemButton>
                </ListItem>
              </List>
            </BorderBox>
          </Stack>
        </Stack>
      </main>
    </Container>
  );
};

export default VolunteerDetail;
