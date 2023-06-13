import StudentPage from "./pages/studentMoodle/StudentPage";
import StudentListMoodleTable from "./pages/studentMoodle/StudentListMoodleTable";
import Comments from "./pages/comment/TableComments";
import AddComment from "./pages/comment/AddComment";
import BeforeWeekTable from "./pages/beforeWeek/BeforeWeekTable";
import BeforeWeekDetail from "./pages/beforeWeek/BeforeWeekDetail";
import BeforeWeekDetailEdit from "./pages/beforeWeek/BeforeWeekEdit";
import AfterWeekTable from "./pages/afterWeek/AfterWeekTable";
import RegisterFormTable from "./pages/reg/registerFormTable";
import RegisterDetail from "./pages/reg/registerFormDetail";
import RegisterFormDetailEdit from "./pages/reg/registerFormDetailEdit";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import CommentIcon from "@mui/icons-material/Comment";
// import AddCommentIcon from "@mui/icons-material/AddComment";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import PortraitIcon from "@mui/icons-material/Portrait";
import AfterWeekDetail from "./pages/afterWeek/AfterWeekDetail";
import AfterWeekDetailEdit from "./pages/afterWeek/AfterWeekDetailEdit";
import justTest from "./pages/justTest";
import UserProfile from "./pages/profile/UserProfile";
import WatchComment from "./pages/comment/WatchComment";
import skillSeeker from "./pages/skillSeeker/skillSeeker";
import EditComments from "./pages/comment/EditComments";
import StudentOfAdmin from "./pages/studentMoodle/StudentOfAdmin";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import Volunteer from "./pages/volunteer/Volunteer";
import VolunteerDetail from "./pages/volunteer/VolunteerDetail";
import GraduateProfile from "./pages/graduate/GraduateProfile";
import GraduateTable from "./pages/graduate/GraduateTable";
import NotFound from "./pages/NotFound";
import skillSeekerDetail from "./pages/skillSeeker/skillSeekerDetail";
import GroupsTable from "./pages/groups/GroupsTable";
import GroupDetail from "./pages/groups/GroupDetail";
import TrainingCoursesTable from "./pages/trainingCourse/TrainingCoursesTable";
import TrainingCoursesDetail from "./pages/trainingCourse/TrainingCoursesDetail";
// import LanguageTable from "./pages/generalEducation/GeneralEducationTable";
import LanguageDetail from "./pages/generalEducation/LanguageDetail";
// import Workshops from "./pages/workshops/workshopsTable";
import WorkshopsDetail from "./pages/workshops/workshopsDetail";
import GeneralEducationTable from "./pages/generalEducation/GeneralEducationTable";
import AddGroup from "./pages/groups/AddGroup";
import GroupEdit from "./pages/groups/GroupEdit";
import AddNewCourse from "./pages/addNewcourse/AddNewCourse";

const ListRoutes = [
  //! ta________________________________
  {
    path: "ta/dashboard",
    name: "داشبورد",
    // icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "ta",
    key: "ta1",
  },
  {
    path: "ta/student",
    name: "فهرست مهارت آموزان",
    // icon: <PeopleIcon />,
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
    path: "ta/all-comments",
    name: "نظرات",
    // icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "ta",
    key: "ta5",
  },
  {
    path: "ta/student/:id/add-comment",
    name: "افزودن نظر جدید",
    // icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "ta",
    key: "ta6",
  },
  {
    path: "ta/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "ta",
    key: "ta7",
  },
  {
    path: "ta/all-comments/:id",
    name: " ",
    component: WatchComment,
    showInNav: false,
    role: "ta",
    key: "ta8",
  },
  {
    path: "ta/all-comments/:id/editing",
    name: " ",
    component: EditComments,
    showInNav: false,
    role: "ta",
    key: "ta9",
  },
  {
    path: "ta/volunteer",
    name: "فهرست پروفایل داوطلبان",
    // icon:<></>,
    component: Volunteer,
    showInNav: true,
    role: "ta",
    key: "ta10",
  },
  {
    path: "ta/volunteer/:username",
    name: "",
    // icon:<></>,
    component: VolunteerDetail,
    showInNav: false,
    role: "ta",
    key: "ta11",
  },

  // mentor____________________________________________
  {
    path: "mentor/dashboard",
    name: "داشبورد",
    // icon: <DashboardIcon />,
    component: Dashboard,
    showInNav: true,
    role: "mentor",
    key: "mentor1",
  },
  {
    path: "mentor/student",
    name: "فهرست مهارت آموزان",
    // icon: <PeopleIcon />,
    component: StudentListMoodleTable,
    showInNav: true,
    role: "mentor",
    key: "mentor2",
  },
  {
    path: "mentor/student/:id",
    name: " ",
    component: StudentPage,
    showInNav: false,
    role: "mentor",
    key: "mentor3",
  },

  {
    path: "mentor/student/:id/add-comment",
    name: "افزودن نظر جدید",
    // icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "mentor",
    key: "mentor6",
  },
  {
    path: "mentor/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "mentor",
    key: "mentor7",
  },
  {
    path: "mentor/all-comments/:id",
    name: " ",
    component: WatchComment,
    showInNav: false,
    role: "mentor",
    key: "mentor8",
  },
  {
    path: "mentor/all-comments/:id/editing",
    name: " ",
    component: EditComments,
    showInNav: false,
    role: "mentor",
    key: "mentor9",
  },
  {
    path: "mentor/volunteer",
    name: "فهرست پروفایل داوطلبان",
    // icon:<></>,
    component: Volunteer,
    showInNav: true,
    role: "mentor",
    key: "mentor10",
  },
  {
    path: "mentor/volunteer/:username",
    name: "",
    // icon:<></>,
    component: VolunteerDetail,
    showInNav: false,
    role: "mentor",
    key: "mentor11",
  },
  {
    path: "mentor/all-comments",
    name: "نظرات",
    // icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "mentor",
    key: "mentor5",
  },
  //! admin__________________________________________
  {
    path: "admin/dashboard",
    name: "داشبورد",
    // icon: <DashboardIcon />,
    component: DashboardAdmin,
    showInNav: true,
    role: "admin",
    key: "admin1",
  },
  {
    path: "admin/register-form",
    name: "فهرست ثبت نام ",
    // icon: <AppRegistrationIcon />,
    component: RegisterFormTable,
    showInNav: true,
    role: "admin",
    key: "admin2",
  },
  {
    path: "admin/before-week",
    name: "فهرست ارزیابی",
    // icon: <PortraitIcon />,
    component: BeforeWeekTable,
    showInNav: true,
    role: "admin",
    key: "admin3",
  },
  {
    path: "admin/after-week",
    name: "فهرست هفته پذیرش",
    // icon: <HowToRegIcon />,
    component: AfterWeekTable,
    showInNav: true,
    role: "admin",
    key: "admin4",
  },
  {
    path: "admin/skill-seeker",
    name: "فهرست متقاضیان",
    // icon: <AddCommentIcon />,
    component: skillSeeker,
    showInNav: true,
    role: "admin",
    key: "admin18",
  },
  {
    path: "admin/before-week/:id",
    name: " ",
    component: BeforeWeekDetail,
    showInNav: false,
    role: "admin",
    key: "admin5",
  },
  {
    path: "admin/before-week-edit/:id",
    name: " ",
    component: BeforeWeekDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin6",
  },

  {
    path: "admin/register-form/:id",
    name: " ",
    component: RegisterDetail,
    showInNav: false,
    role: "admin",
    key: "admin7",
  },
  {
    path: "admin/register-form-edit/:id",
    name: " ",
    component: RegisterFormDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin8",
  },
  {
    path: "admin/after-week/:id",
    name: " ",
    component: AfterWeekDetail,
    showInNav: false,
    role: "admin",
    key: "admin9",
  },
  {
    path: "admin/after-week-edit/:id",
    name: " ",
    component: AfterWeekDetailEdit,
    showInNav: false,
    role: "admin",
    key: "admin10",
  },
  {
    path: "admin/profile",
    name: " ",
    component: UserProfile,
    showInNav: false,
    role: "admin",
    key: "admin11",
  },
  {
    path: "admin/all-comments/:id",
    name: " ",
    component: WatchComment,
    showInNav: false,
    role: "admin",
    key: "admin12",
  },
  {
    path: "admin/student",
    name: "فهرست مهارت آموزان",
    // icon: <PeopleIcon />,
    component: StudentOfAdmin,
    showInNav: true,
    role: "admin",
    key: "admin13",
  },
  {
    path: "admin/student/:id",
    name: " ",
    component: StudentPage,
    showInNav: false,
    role: "admin",
    key: "admin14",
  },
  {
    path: "admin/volunteer",
    name: "فهرست پروفایل داوطلبان",
    // icon:<></>,
    component: Volunteer,
    showInNav: true,
    role: "admin",
    key: "admin15",
  },
  {
    path: "admin/graduate",
    name: "فهرست فارغ‌التحصیلان",
    // icon:<></>,
    component: GraduateTable,
    showInNav: true,
    role: "admin",
    key: "admin20",
  },
  {
    path: "admin/all-comments",
    name: "نظرات",
    // icon: <CommentIcon />,
    component: Comments,
    showInNav: true,
    role: "admin",
    key: "admin16",
  },
  {
    path: "admin/student/:id/add-comment",
    name: "افزودن نظر جدید",
    // icon: <AddCommentIcon />,
    component: AddComment,
    showInNav: false,
    role: "admin",
    key: "admin17",
  },
  {
    path: "admin/skill-seeker/:id",
    name: "",
    // icon: <AddCommentIcon />,
    //for this address,using afterWeekDetail, may someday need to change
    component: skillSeekerDetail,
    showInNav: false,
    role: "admin",
    key: "admin18",
  },
  {
    path: "admin/volunteer/:username",
    name: "",
    // icon:<></>,
    component: VolunteerDetail,
    showInNav: false,
    role: "admin",
    key: "admin19",
  },

  {
    path: "admin/graduate/profile/1",
    name: "",
    // icon:<></>,
    component: GraduateProfile,
    showInNav: false,
    role: "admin",
    key: "admin21",
  },
  {
    path: "admin/groups",
    name: "فهرست گروه‌ها",
    // icon:<></>,
    component: GroupsTable,
    showInNav: true,
    role: "admin",
    key: "admin22",
  },
  {
    path: "admin/groups/:groupId",
    name: "",
    // icon:<></>,
    component: GroupDetail,
    showInNav: false,
    role: "admin",
    key: "admin22-d",
  },
  {
    path: "admin/groups/edit/:groupId",
    name: "",
    // icon:<></>,
    component: GroupEdit,
    showInNav: false,
    role: "admin",
    key: "admin22-e",
  },
  {
    path: "admin/groups/add-group",
    name: "",
    // icon:<></>,
    component: AddGroup,
    showInNav: false,
    role: "admin",
    key: "admin22-a",
  },
  {
    path: "admin/training-course",
    name: "فهرست دوره‌های تخصصی",
    // icon:<></>,
    component: TrainingCoursesTable,
    showInNav: true,
    role: "admin",
    key: "admin23",
  },
  {
    path: "admin/training-course/1",
    name: "",
    // icon:<></>,
    component: TrainingCoursesDetail,
    showInNav: false,
    role: "admin",
    key: "admin23-d",
  },
  {
    path: "admin/general-course",
    name: "فهرست آموزش‌های عمومی",
    // icon:<></>,
    component: GeneralEducationTable,
    showInNav: true,
    role: "admin",
    key: "admin24",
  },
  {
    path: "admin/language-course/1",
    name: "",
    // icon:<></>,
    component: LanguageDetail,
    showInNav: false,
    role: "admin",
    key: "admin24-d",
  },
  {
    path: "admin/add-new-course",
    name: "افزودن دوره جدید",
    // icon:<></>,
    component: AddNewCourse,
    showInNav: true,
    role: "admin",
    key: "admin25",
  },
  // {
  //   path: "admin/workshops",
  //   name: "فهرست کارگاه‌های جانبی",
  //   // icon:<></>,
  //   component: Workshops,
  //   showInNav: true,
  //   role: "admin",
  //   key: "admin25",
  // },
  {
    path: "admin/workshops/1",
    name: "",
    // icon:<></>,
    component: WorkshopsDetail,
    showInNav: false,
    role: "admin",
    key: "admin25-d",
  },

  {
    path: "notfound",
    component: NotFound,
    showInNav: false,
    key: "notFound",
  },
  {
    path: "test123456789",
    name: "",
    // icon: <AddCommentIcon />,
    component: justTest,
    showInNav: false,
    role: "admin",
    key: "test11111111111",
  },
];

export default ListRoutes;
