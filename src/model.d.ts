export type RoleType = ADMIN | TEACHER | TA | MENTOR;

export interface AuthType {
  username: string;
  password: string;
  roles: RoleType[];
  token: string;
  id?: number;
}

export interface AuthContextType {
  auth: AuthType;
  setAuth: void;
}

export interface CustomizedStateLocation {
  from: { hash: string; key: string; pathname: string; search: string };
}

export interface AllowedRoles {
  allowedRoles: RoleType[];
}

interface RolesStudent {
  id: number;
  archeType: string;
  description: string;
  name: string;
  userRole: string;
}

export interface StudentUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  roles: RolesStudent[];
}

export interface StudentProp {
  student: StudentUser;
}

//types for comment

export interface Course {
  id: number;
  courseName: string;
}
export interface Comment {
  id: number;
  checked: boolean;
  comment: string;
  createTime: string;
  updateTime?: string;
  studentUser: StudentUser;
  taUser: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roles: [];
  };
  course: Course;
}

export interface Course {
  courseName: string;
  id: number;
}

export interface editCommentProp {
  editId: number | null;
  openEditState: boolean;
  shareComment: string;
  setOpenEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshByEdit: React.Dispatch<React.SetStateAction<number>>;
}

export interface MoodleUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  roles: Array;
  username: string;
  idNumber: string;
  phone: string;
  mobile: string;
  institution: string;
  department: string;
  address: string;
  city: string;
  country: string;
  lang: string;
  timezone: string;
  calendarType: string;
  description: string;
  picture: {
    address: string;
  };
}

export interface LocalStorage {
  key: string;
  value: {
    roles: string[];
    token: string;
  };
}

export interface RegistrationForm {
  id: number;
  checked: boolean;
  registrationCode: string;
  codeMeli: string;
  firstName: string;
  family: string;
  province: string;
  city: string;
  gender: string;
  birthDate: string;
  mobile: string;
  email: string;
  familiarity: string;
  education: string;
  studyField: string;
  selectedField: string;
  description: string;
  token: string;
}

export interface BeforeWeekType {
  registrationForm: RegistrationForm;
  id: number;
  acceptWeekChecked: boolean;
  accessTime: string;
  algoLevelResult: string;
  avgSalary: string;
  beforeAcceptDesc: string;
  charity: string;
  comLevelResult: string;
  computerAccess: string;
  computerFamiliarity: boolean;
  contCourseApproach: string;
  courseDescription: string;
  createTime: string;
  currentField: string;
  currentInstName: string;
  currentInstType: string;
  deleteTime: string;
  deleted: boolean;
  eduLevel: string;
  eduStatus: string;
  familiar: string;
  firstSelectJobRoad: string;
  freeDailyTime: string;
  instituteType: string;
  internetAccess: string;
  jobReady: boolean;
  jobStandby: boolean;
  jobStatus: string;
  jobTitle: string;
  jobType: string;
  jobVision: string;
  lastInstitute: string;
  limitTime: string;
  mbtiTest: string;
  motivation: string;
  noneJobActivation: string;
  notifyAcceptWeek: string;
  paymentImageAddress: string;
  programmingCoursePassed: boolean;
  stuSemester: string;
  stuYear: string;
  updateTime: string;
  webDevFamiliarity: boolean;
  workTime: string;
  workshopCont: string;
}

interface AfterWeekType {
  beforeWeekForm: BeforeWeek;
  id: number;
  afterWeekChecked: boolean;
  algoScore: number;
  comAccess: string;
  comAccessStatus: string;
  comScore: number;
  consistCompleteTime: string;
  consistTime: string;
  etcDesc: string;
  ethics: string;
  finalField: string;
  finalResult: string;
  jobCommit: string;
  langScore: number;
  limitAndRisk: string;
  predict: string;
  presentStatus: string;
  recommendField: string;
  scholar: boolean;
  scholarPercentage: number;
  workCommit: string;
}

export interface TableBodyAllType {
  id: number;
  birthDate: string;
  family: string;
  firstName: string;
  registrationCode: string;
  codeMeli: string;
  mobile: string;
  email: string;
  roles: string;
  directNav: string;
}
