import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress";
import { AfterWeekType, StudentInfo } from "../../model";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useGetImage from "../../hooks/request/useGetImage";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import RegisterInfo from "../../components/student/RegisterInfo";
import StudentDetailMore from "../../components/student/StudentDetailMore";

import BeforeWeekDetailShowComp from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AfterWeekDetailShowComp from "../../components/afterWeek/AfterWeekDetailShowComp";
import GeneralCourseStudent from "../../components/student/GeneralCourseStudent";
import CoreCourseStudent from "../../components/student/CoreCourseStudent";
import StatusStudent from "../../components/student/StatusStudent";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { useAuth } from "../../context/AuthProvider";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";

const StudentDetail = () => {
  const {
    auth: { roles },
  } = useAuth();
  const isTa = roles.includes("ta"); //unmount "اطلاعات ارزیابی" for ta
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const studentProfile = `/moodle/user/${id}`;
  const afterBeforeInfo = `/exam/after/week/form/moodle/${id}`;
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");

  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR<StudentInfo>(studentProfile, {
    onSuccess: () => window.scrollTo(0, 0),
  });
  const {
    data: afterBeforeData,
    isLoading: afterBeforeLoading,
    error: afterBeforeError,
  } = useSWR<AfterWeekType>(afterBeforeInfo);
  const image = data?.picture?.imageAddress;
  useEffect(() => {
    if (image) {
      getPicture(image);
    }
  }, [image, getPicture]);
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    toast.error(handleError(error));
    navigate("/");
  }
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg">
      <header>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          {pic !== undefined ? (
            <Avatar
              sx={{
                width: "7rem",
                height: "7rem",
                borderRadius: "50%",
                mr: 3,
              }}
              src={pic!}
              alt="profile image"
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 120 }} />
          )}
          <Typography variant="h5">
            {data?.firstName + " " + data?.family}
          </Typography>
          <Button
            variant="outlined"
            sx={{ px: 5, ml: "auto" }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={"scrollable"}
          scrollButtons="auto"
        >
          <Tab label="اطلاعات ثبت‌نام" {...a11yProps(0)} />
          <Tab
            label="اطلاعات ارزیابی"
            {...a11yProps(1)}
            disabled={isTa}
            sx={{ ...(isTa && { display: "none" }) }}
          />
          <Tab label="اطلاعات پذیرش" {...a11yProps(2)} />
          <Tab label="مشخصات فردی" {...a11yProps(3)} />
          <Tab label="وضعیت آموزش" {...a11yProps(4)} />
          <Tab label="دوره‌های تخصصی" {...a11yProps(5)} />
          <Tab label="دوره‌های عمومی" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {afterBeforeLoading ? (
          <LoadingProgress />
        ) : (
          <>
            {afterBeforeError ? (
              <p>اطلاعات ثبت‌نام برای این مهارت آموز وجود ندارد</p>
            ) : (
              <RegisterFormDetailComp
                student={afterBeforeData?.beforeWeekForm?.registrationForm}
                studentDetailComp={true}
              />
            )}
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {afterBeforeLoading ? (
          <LoadingProgress />
        ) : (
          <>
            {afterBeforeError ? (
              <p>اطلاعات ارزیابی برای این مهارت آموز وجود ندارد</p>
            ) : (
              <BeforeWeekDetailShowComp
                typeComp="student"
                student={afterBeforeData?.beforeWeekForm}
                matches={matches}
                id={id}
              />
            )}
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {afterBeforeError ? (
          <p>اطلاعات پذیرش برای این مهارت آموز وجود ندارد</p>
        ) : (
          <AfterWeekDetailShowComp
            typeComp="student"
            student={afterBeforeData}
            matches={matches}
            id={id}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StudentDetailMore studentDetail={data?.infoData} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatusStudent
          careerPathway={afterBeforeData?.careerPathway}
          statusForm={data?.statusForm}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <CoreCourseStudent
          courses={data?.modulesAsStudent.filter(
            (item) => item.module.moduleType === "core"
          )}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <GeneralCourseStudent
          courses={data?.modulesAsStudent.filter(
            (item) => item.module.moduleType !== "core"
          )}
        />
      </TabPanel>
    </Container>
  );
};

export default StudentDetail;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
