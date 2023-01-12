import { Dashboard } from "./pages/Dashboard";
import StudentPage from "./pages/studentMoodle/StudentPage";
import StudentListMoodleTable from "./pages/studentMoodle/StudentListMoodleTable";
import Comments from "./pages/comment/Comments";
import AddComment from "./pages/comment/AddComment";
import BeforeWeekTable from "./pages/beforeWeek/BeforeWeekTable";
import BeforeWeekDetail from "./pages/beforeWeek/BeforeWeekDetail";
import BeforeWeekDetailEdit from "./pages/beforeWeek/BeforeWeekEdit";
import AfterWeekTable from "./pages/afterWeek/AfterWeekTable";
import RegisterFormTable from "./pages/reg/registerFormTable";
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
import AllComments from "./pages/comment/AllComments";
import UserProfile from "./pages/profile/UserProfile";

const ListRoutes = [
  // ta________________________________
  {
    path: "ta/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "ta",
    key: "ta1",
  },
  {
    path: "ta/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodleTable,
    showInNav: true,
    role: "ta",
    key: "ta2",
  },
  {
    path: "ta/student/:id",
    name: " ",
    component: StudentPage,
    showInNav: false,
    role: "ta",
    key: "ta3",
  },
  {
    path: "ta/all-comments/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: false,
    role: "ta",
    key: "ta4",
  },
  {
    path: "ta/all-comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: AllComments,
    showInNav: true,
    role: "ta",
    key: "ta5",
  },
  {
    path: "ta/student/:id/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "ta",
    key: "ta6",
  },
  {
    path: "teacher/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "teacher",
    key: "teacher7",
  },

  //!at the moment mentor is ignored
  // mentor______________________________
  // {
  //   path: "mentor/dashboard",
  //   name: "داشبورد",
  //   icon: <DashboardIcon />,
  //   component: Dashboard,
  //   showInNav: true,
  //   role: "mentor",
  //   key: 5,
  // },
  // {
  //   path: "mentor/student",
  //   name: "لیست مهارت جو ها",
  //   icon: <PeopleIcon />,
  //   component: StudentListMoodleTable,
  //   showInNav: true,
  //   role: "mentor",
  //   key: 6,
  // },
  // {
  //   path: "mentor/student/:id",
  //   name: "جزییات مهارت جو ها",
  //   component: StudentPage,
  //   showInNav: false,
  //   role: "mentor",
  //   key: 7,
  // },
  // {
  //   path: "mentor/comments",
  //   name: "همه نظرات",
  //   icon: <CommentIcon />,
  //   component: Comments,
  //   showInNav: true,
  //   role: "mentor",
  //   key: 8,
  // },
  // {
  //   path: "mentor/add-comment",
  //   name: "افزودن نظر جدید",
  //   icon: <AddCommentIcon />,
  //   component: AddComment,
  //   showInNav: false,
  //   role: "mentor",
  //   key: 9,
  // },

  // teacher____________________________________________
  {
    path: "teacher/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "teacher",
    key: "teacher1",
  },
  {
    path: "teacher/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodleTable,
    showInNav: true,
    role: "teacher",
    key: "teacher2",
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
    path: "teacher/all-comments/comments",
    name: " ",
    component: Comments,
    showInNav: false,
    role: "teacher",
    key: "teacher4",
  },
  {
    path: "teacher/all-comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: AllComments,
    showInNav: true,
    role: "teacher",
    key: "teacher5",
  },
  {
    path: "teacher/student/:id/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "teacher",
    key: "teacher6",
  },
  {
    path: "ta/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "ta",
    key: "ta7",
  },

  // {
  //   path: "teacher/register-form",
  //   name: "لیست فرم های ثبت نام ",
  //   icon: <AppRegistrationIcon />,
  //   component: RegisterFormTable,
  //   showInNav: true,
  //   role: "teacher",
  //   key: "teacher9",
  // },
  // {
  //   path: "teacher/before-week",
  //   name: "لیست فرم های آزمون",
  //   icon: <PortraitIcon />,
  //   component: BeforeWeekTable,
  //   showInNav: true,
  //   role: "teacher",
  //   key: "teacher6",
  // },
  // {
  //   path: "teacher/after-week",
  //   name: "لیست هفته پذیرش",
  //   icon: <HowToRegIcon />,
  //   component: AfterWeekTable,
  //   showInNav: true,
  //   role: "teacher",
  //   key: "teacher16",
  // },
  // {
  //   path: "teacher/before-week/:id",
  //   name: " ",
  //   component: BeforeWeekDetail,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher7",
  // },
  // {
  //   path: "teacher/before-week-edit/:id",
  //   name: " ",
  //   component: BeforeWeekDetailEdit,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher8",
  // },
  // {
  //   path: "teacher/register-form/:id",
  //   name: " ",
  //   component: RegisterDetail,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher10",
  // },
  // {
  //   path: "teacher/register-form-edit/:id",
  //   name: " ",
  //   component: RegisterFormDetailEdit,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher11",
  // },
  // {
  //   path: "teacher/after-week/:id",
  //   name: " ",
  //   component: AdmissionFormDetail,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher12",
  // },
  // {
  //   path: "teacher/after-week-edit/:id",
  //   name: " ",
  //   component: AdmissionFormDetailEdit,
  //   showInNav: false,
  //   role: "teacher",
  //   key: "teacher13",
  // },

  // admin__________________________________________
  {
    path: "admin/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "admin",
    key: "admin1",
  },
  {
    path: "admin/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodleTable,
    showInNav: true,
    role: "admin",
    key: "admin2",
  },
  {
    path: "admin/student/:id",
    name: "جزییات مهارت جو ها",
    component: StudentPage,
    showInNav: false,
    role: "admin",
    key: "admin3",
  },
  {
    path: "admin/all-comments/comments",
    name: " ",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: false,
    role: "admin",
    key: "admin4",
  },
  {
    path: "admin/all-comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: AllComments,
    showInNav: true,
    role: "admin",
    key: "admin15",
  },
  {
    path: "admin/student/:id/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "admin",
    key: "admin5",
  },
  {
    path: "admin/register-form",
    name: "لیست فرم های ثبت نام ",
    icon: <AppRegistrationIcon />,
    component: RegisterFormTable,
    showInNav: true,
    role: "admin",
    key: "admin6",
  },
  {
    path: "admin/before-week",
    name: "لیست فرم های آزمون",
    icon: <PortraitIcon />,
    component: BeforeWeekTable,
    showInNav: true,
    role: "admin",
    key: "admin7",
  },
  {
    path: "admin/after-week",
    name: "لیست هفته پذیرش",
    icon: <HowToRegIcon />,
    component: AfterWeekTable,
    showInNav: true,
    role: "admin",
    key: "admin8",
  },
  {
    path: "admin/before-week/:id",
    name: " ",
    component: BeforeWeekDetail,
    showInNav: false,
    role: "admin",
    key: "admin9",
  },
  {
    path: "admin/before-week-edit/:id",
    name: " ",
    component: BeforeWeekDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin10",
  },

  {
    path: "admin/register-form/:id",
    name: " ",
    component: RegisterDetail,
    showInNav: false,
    role: "admin",
    key: "admin11",
  },
  {
    path: "admin/register-form-edit/:id",
    name: " ",
    component: RegisterFormDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin12",
  },
  {
    path: "admin/after-week/:id",
    name: " ",
    component: AdmissionFormDetail,
    showInNav: false,
    role: "admin",
    key: "admin13",
  },
  {
    path: "admin/after-week-edit/:id",
    name: " ",
    component: AdmissionFormDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin14",
  },
  {
    path: "admin/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "admin",
    key: "admin15",
  },
  {
    path: "test",
    name: " ",
    icon: <AddCommentIcon />,
    component: justTest,
    showInNav: false,
    role: "admin",
    key: "test11111111111",
  },
];

export default ListRoutes;
