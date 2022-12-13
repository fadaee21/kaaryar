import { Dashboard } from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import StudentListMoodle from "./pages/StudentListMoodle";
import Comments from "./pages/Comments";
import AddComment from "./pages/AddComment";
import BeforeWeek from "./pages/beforeWeek/BeforeWeek";
import BeforeWeekDetail from "./pages/beforeWeek/BeforeWeekDetail";
import BeforeWeekDetailEdit from "./pages/beforeWeek/BeforeWeekEdit";
import AfterWeek from "./pages/afterWeek/AfterWeek";
import Register from "./pages/reg/registerForm";
import RegisterDetail from "./pages/reg/registerFormDetail";
import RegisterFormDetailEdit from "./pages/reg/registerFormDetailEdit";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PortraitIcon from "@mui/icons-material/Portrait";
import AdmissionFormDetail from "./pages/afterWeek/AfterWeekDetail";
import AdmissionFormDetailEdit from "./pages/afterWeek/AfterWeekDetailEdit";
import justTest from "./pages/justTest";

const ListRoutes = [
  // ta________________________________
  {
    path: "ta/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "ta",
    key: 0,
  },
  {
    path: "ta/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodle,
    showInNav: true,
    role: "ta",
    key: 1,
  },
  {
    path: "ta/student/:id",
    name: "جزییات مهارت جو ها",
    component: StudentPage,
    showInNav: false,
    role: "ta",
    key: 2,
  },
  {
    path: "ta/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "ta",
    key: 3,
  },
  {
    path: "ta/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: true,
    role: "ta",
    key: 4,
  },

  // mentor______________________________
  {
    path: "mentor/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "mentor",
    key: 5,
  },
  {
    path: "mentor/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodle,
    showInNav: true,
    role: "mentor",
    key: 6,
  },
  {
    path: "mentor/student/:id",
    name: "جزییات مهارت جو ها",
    component: StudentPage,
    showInNav: false,
    role: "mentor",
    key: 7,
  },
  {
    path: "mentor/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "mentor",
    key: 8,
  },
  {
    path: "mentor/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: true,
    role: "mentor",
    key: 9,
  },

  // teacher____________________________________________
  {
    path: "teacher/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "teacher",
    key: "teacher2",
  },
  {
    path: "teacher/register-form",
    name: "لیست فرم های ثبت نام ",
    icon: <AppRegistrationIcon />,
    component: Register,
    showInNav: true,
    role: "teacher",
    key: "teacher9",
  },
  {
    path: "teacher/before-week",
    name: "لیست فرم های آزمون",
    icon: <PortraitIcon />,
    component: BeforeWeek,
    showInNav: true,
    role: "teacher",
    key: "teacher6",
  },
  {
    path: "teacher/after-week",
    name: "لیست هفته پذیرش",
    icon: <HowToRegIcon />,
    component: AfterWeek,
    showInNav: true,
    role: "teacher",
    key: "teacher16",
  },

  {
    path: "teacher/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodle,
    showInNav: true,
    role: "teacher",
    key: "teacher1",
  },
  {
    path: "teacher/student/:id",
    name: " ",
    component: StudentPage,
    showInNav: false,
    role: "teacher",
    key: "teacher3",
  },
  {
    path: "teacher/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "teacher",
    key: "teacher4",
  },
  {
    path: "teacher/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: true,
    role: "teacher",
    key: "teacher5",
  },

  {
    path: "teacher/before-week/:id",
    name: " ",
    component: BeforeWeekDetail,
    showInNav: false,
    role: "teacher",
    key: "teacher7",
  },
  {
    path: "teacher/before-week-edit/:id",
    name: " ",
    component: BeforeWeekDetailEdit,
    showInNav: false,
    role: "teacher",
    key: "teacher8",
  },

  {
    path: "teacher/register-form/:id",
    name: " ",
    component: RegisterDetail,
    showInNav: false,
    role: "teacher",
    key: "teacher10",
  },
  {
    path: "teacher/register-form-edit/:id",
    name: " ",
    component: RegisterFormDetailEdit,
    showInNav: false,
    role: "teacher",
    key: "teacher11",
  },
  {
    path: "teacher/after-week/:id",
    name: " ",
    component: AdmissionFormDetail,
    showInNav: false,
    role: "teacher",
    key: "teacher12",
  },
  {
    path: "teacher/after-week-edit/:id",
    name: " ",
    component: AdmissionFormDetailEdit,
    showInNav: false,
    role: "teacher",
    key: "teacher13",
  },

  // admin__________________________________________
  {
    path: "admin/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "admin",
    key: 15,
  },
  {
    path: "admin/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodle,
    showInNav: true,
    role: "admin",
    key: 16,
  },
  {
    path: "admin/student/:id",
    name: "جزییات مهارت جو ها",
    component: StudentPage,
    showInNav: false,
    role: "admin",
    key: 17,
  },
  {
    path: "admin/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "admin",
    key: 18,
  },
  {
    path: "admin/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: true,
    role: "admin",
    key: 19,
  },
  {
    path: "test",
    name: "",
    icon: <AddCommentIcon />,
    component: justTest,
    showInNav: false,
    role: "teacher",
    key: "test11111111111",
  },
];

export default ListRoutes;
