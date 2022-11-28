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
// export interface Learner {
//   id: number;
//   firstName: string;
//   lastName: string;
//   username: string;
//   roles: RolesStudent[];
// }
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

export interface ExamRegisterUser {
  registrationForm: RegistrationForm;
  id: number;
  acceptWeekChecked: true;
  accessTime: string;
  algoLevelResult: string;
  algoScore: number;
  avgSalary: string;
  beforeAcceptChecked: true;
  beforeAcceptDesc: string;
  charity: string;
  comAccess: string;
  comAccessStatus: string;
  comLevelResult: string;
  comScore: number;
  computerAccess: string;
  computerFamiliarity: true;
  consistCompleteTime: string;
  consistTime: string;
  contCourseApproach: string;
  courseDescription: string;
  currentField: string;
  currentInstName: string;
  currentInstType: string;
  eduLevel: string;
  eduStatus: string;
  etcDesc: string;
  ethics: string;
  examFormChecked: true;
  familiar: string;
  finalField: string;
  finalResult: string;
  finalResultChecked: true;
  firstSelectJobRoad: string;
  freeDailyTime: string;
  instituteType: string;
  internetAccess: string;
  jobCommit: string;
  jobReady: true;
  jobStandby: true;
  jobStatus: string;
  jobTitle: string;
  jobType: string;
  jobVision: string;
  langScore: number;
  lastInstitute: string;
  limitAndRisk: string;
  limitTime: string;
  mbtiTest: string;
  motivation: string;
  noneJobActivation: string;
  notifyAcceptWeek: string;
  paymentImageAddress: string;
  predict: string;
  presentStatus: string;
  programmingCoursePassed: true;
  recommendField: string;
  scholar: true;
  scholarPercentage: number;
  stuSemester: string;
  stuYear: string;
  webDevFamiliarity: true;
  weekResultChecked: true;
  workCommit: string;
  workTime: string;
  workshopCont: string;
}
