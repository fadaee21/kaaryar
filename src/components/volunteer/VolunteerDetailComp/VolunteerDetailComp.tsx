import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

import { Chip, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { VolunteerProfile } from "../../../model";
import useGetImage from "../../../hooks/request/useGetImage";
import PublicProfile from "./PublicProfile";
import { TabPanel, a11yProps } from "../../../pages/student/StudentDetail";
import VolunteerEditParent from "./VolunteerEditParent";
import ModulesVolunteer from "./module-volunteer/ModulesVolunteer";
interface VolDetailType extends VolunteerProfile {
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
  isActive,
  modules,
}: VolDetailType) => {
  const [value, setValue] = useState(0);
  const [editingProfile, setEditingProfile] = useState(false);
  const [tab, setTab] = useSearchParams(undefined);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTab({ tab: newValue.toString() });
  };
  let numberValue;

  const tabVal = tab.get("tab");

  if (tabVal !== null) {
    numberValue = Number(tabVal);
  } else {
    numberValue = 0;
  }

  const navigate = useNavigate();
  const {
    adminVisibility,
    auth: { username: usernameLogger },
  } = useAuth();
  const sameUser = usernameParam === usernameLogger;
  const whoCanSeeComments = adminVisibility || sameUser;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const fullName = `${firstName || ""} ${lastName || ""}`;
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
              {fullName}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" fontWeight={400}>
                {role} کاریار
              </Typography>
              <Chip
                label={isActive ? "فعال" : "غیرفعال"}
                color={isActive ? "success" : "error"}
              />
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{ px: 5 }}
              color="inherit"
              endIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              بازگشت
            </Button>
          </Stack>
        </Box>
      </header>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={numberValue || value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={"scrollable"}
          scrollButtons="auto"
        >
          <Tab label="درباره داوطلب" {...a11yProps(0)} />
          <Tab
            label="دوره‌های فعالیت"
            {...a11yProps(1)}
            disabled={modules.length < 1}
          />
          {/* <Tab label="بازخوردها" {...a11yProps(2)} />
          <Tab label="درخواست جلسه" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>

      <TabPanel value={numberValue || value} index={0}>
        {editingProfile ? (
          <VolunteerEditParent setEditingProfile={setEditingProfile} />
        ) : (
          <>
            <Stack direction="row" justifyContent={"end"}>
              {sameUser && (
                <Button
                  endIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setEditingProfile(true)}
                >
                  ویرایش
                </Button>
              )}
            </Stack>
            <PublicProfile
              aboutMe={aboutMe}
              usernameParam={usernameParam}
              birthday={birthday}
              city={city}
              country={country}
              mobile={mobile}
              email={email}
              currentJob={currentJob}
              currentJobLocation={currentJobLocation}
              custom={custom}
              github={github}
              gitlab={gitlab}
              id={id}
              lastEduLevel={lastEduLevel}
              lastEduLocation={lastEduLocation}
              lastMajor={lastMajor}
              linkedin={linkedin}
              researchgate={researchgate}
              website={website}
              gender={gender}
            />
          </>
        )}
      </TabPanel>
      <TabPanel value={numberValue || value} index={1}>
        <ModulesVolunteer
          modules={modules}
          fullName={fullName}
          whoCanSeeComments={whoCanSeeComments}
          adminVisibility={adminVisibility}
        />
      </TabPanel>
    </>
  );
};

export default VolunteerDetailComp;
