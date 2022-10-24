import { Dashboard } from "./pages/Dashboard";
import StudentDetail from "./pages/StudentDetail";
import StudentListMoodle from "./pages/StudentListMoodle";
import Comments from "./pages/Comments";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CommentIcon from "@mui/icons-material/Comment";
import AddComment from "./pages/AddComment";
import AddCommentIcon from '@mui/icons-material/AddComment';
const ListRoutes = [
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
    component: StudentDetail,
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
    component: StudentDetail,
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
  {
    path: "teacher/dashboard",
    name: "داشبورد",
    icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "teacher",
    key: 10,
  },
  {
    path: "teacher/student",
    name: "لیست مهارت جو ها",
    icon: <PeopleIcon />,
    component: StudentListMoodle,
    showInNav: true,
    role: "teacher",
    key: 11,
  },
  {
    path: "teacher/student/:id",
    name: "جزییات مهارت جو ها",
    component: StudentDetail,
    showInNav: false,
    role: "teacher",
    key: 12,
  },
  {
    path: "teacher/comments",
    name: "همه نظرات",
    icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "teacher",
    key: 13,
  },
  {
    path: "teacher/add-comment",
    name: "افزودن نظر جدید",
    icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: true,
    role: "teacher",
    key: 14,
  },
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
    component: StudentDetail,
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
];

export default ListRoutes;
