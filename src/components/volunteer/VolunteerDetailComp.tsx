import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { useMediaQuery, useTheme } from "@mui/material";
import { Profile } from "../../model";
import useGetImage from "../../hooks/request/useGetImage";
interface VolDetailType extends Profile {
  usernameParam: string | undefined;
}

const VolunteerDetailComp = ({
  usernameParam,
  aboutMe,
  city,
  birthday,
  country,
  currentJob,
  currentJobLocation,
  custom,
  email,
  firstName,
  gender,
  github,
  gitlab,
  id,
  imageAddress,
  lastEduLevel,
  lastEduLocation,
  lastMajor,
  lastName,
  linkedin,
  mobile,
  researchgate,
  role,
  website,
  picture,
}: VolDetailType) => {
  const navigate = useNavigate();
  const {
    auth: { roles, username },
  } = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const arrCustom = custom && JSON.parse(custom);
  const isArrCustom = arrCustom?.length > 0;

  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  useEffect(() => {
    picture && getPicture(picture.file_hash);
  }, [getPicture, picture]);

  return (
    <>
      <header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 3,
            mb: 10,
            ...(matches
              ? { flexDirection: "row" }
              : { flexDirection: "column" }),
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }} src={pic} />

          <Box sx={{ mr: "auto" }}>
            <Typography variant="h5" gutterBottom>
              {`${firstName ? firstName : ""} ${lastName ? lastName : ""}`}
            </Typography>
            <Typography variant="h6" fontWeight={400}>
              {role} کاریار
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            {usernameParam === username && (
              <Button
                endIcon={<EditIcon />}
                variant="outlined"
                onClick={() => navigate(`/${roles}/profile`)}
              >
                ویرایش
              </Button>
            )}
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
        {aboutMe && (
          <>
            <Stack direction="row" alignItems="center" gap={1}>
              <TextSnippetOutlinedIcon />
              <Typography variant="h6">درباره من</Typography>
            </Stack>
            <BorderBoxAbout>
              <Typography variant="body2">{aboutMe}</Typography>
            </BorderBoxAbout>
          </>
        )}
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 22 }}
        >
          {(birthday || city || country || mobile || email) && (
            <Stack sx={{ width: "100%" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <PersonOutlineOutlinedIcon />
                <Typography variant="h6">مشخصات فردی</Typography>
              </Stack>
              <BorderBox>
                <List>
                  {birthday && (
                    <ListItem>
                      <ListIcon>
                        <CalendarTodayIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={`متولد ${birthday}`} />
                    </ListItem>
                  )}
                  {(city || country) && (
                    <ListItem>
                      <ListIcon>
                        <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={`ساکن ${country}، ${city}`} />
                    </ListItem>
                  )}
                  {mobile && (
                    <ListItem>
                      <ListIcon>
                        <PhoneEnabledIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={mobile} />
                    </ListItem>
                  )}
                  {email && (
                    <ListItem>
                      <ListIcon>
                        <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={email} />
                    </ListItem>
                  )}
                </List>
              </BorderBox>
            </Stack>
          )}

          {(lastMajor ||
            lastEduLocation ||
            lastEduLevel ||
            currentJob ||
            currentJobLocation) && (
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
                  {(lastMajor || lastEduLevel) && (
                    <ListItem>
                      <ListIcon>
                        <SchoolOutlinedIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={`${lastEduLevel} ${lastMajor}`} />
                    </ListItem>
                  )}
                  {lastEduLocation && (
                    <ListItem>
                      <ListIcon>
                        <CorporateFareIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText primary={lastEduLocation} />
                    </ListItem>
                  )}
                  {(currentJob || currentJobLocation) && (
                    <ListItem>
                      <ListIcon>
                        <WorkOutlineIcon sx={{ fontSize: 16 }} />
                      </ListIcon>
                      <ListText
                        primary={`${currentJob} در شرکت ${currentJobLocation}`}
                      />
                    </ListItem>
                  )}
                </List>
              </BorderBox>
            </Stack>
          )}
          {(website ||
            github ||
            gitlab ||
            researchgate ||
            linkedin ||
            isArrCustom) && (
            <Stack sx={{ width: "100%" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <LanguageIcon />
                <Typography variant="h6">لینک‌های مرتبط</Typography>
              </Stack>
              <BorderBox
                sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
              >
                <List disablePadding>
                  {website && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href={website}
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                      >
                        <ListIcon>
                          <LanguageIcon sx={{ fontSize: 16 }} />
                        </ListIcon>
                        <ListText primary="وب‌سایت" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {github && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href={github}
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                      >
                        <ListIcon>
                          <GitHubIcon sx={{ fontSize: 16 }} />
                        </ListIcon>
                        <ListText primary="GitHub" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {gitlab && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href="/#"
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                      >
                        <ListIcon>
                          <LinkIcon sx={{ fontSize: 16 }} />
                        </ListIcon>
                        <ListText primary="GitLab" />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
                <List disablePadding>
                  {researchgate && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href="/#"
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                      >
                        <ListIcon>
                          <LinkIcon sx={{ fontSize: 16 }} />
                        </ListIcon>
                        <ListText primary="Research Gate" />
                      </ListItemButton>
                    </ListItem>
                  )}

                  {linkedin && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href={linkedin}
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                      >
                        <ListIcon>
                          <LinkedInIcon sx={{ fontSize: 16 }} />
                        </ListIcon>
                        <ListText primary="LinkedIn" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {isArrCustom &&
                    arrCustom.map((item: any) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton
                          component="a"
                          href={item.address}
                          sx={{ ":hover": { backgroundColor: "transparent" } }}
                        >
                          <ListIcon>
                            <LinkIcon sx={{ fontSize: 16 }} />
                          </ListIcon>
                          <ListText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </BorderBox>
            </Stack>
          )}
        </Stack>
      </main>
    </>
  );
};

export default VolunteerDetailComp;
