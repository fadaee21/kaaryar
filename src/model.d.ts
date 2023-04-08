export type RoleType = "admin" | "mentor" | "ta" | "teacher" | null;

export interface AuthType {
  username: string;
  password?: string;
  roles: RoleType[];
  // token: string;
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
  family: string;
  roles: RolesStudent[];
  city: string;
  email: string;
  mobile: string;
  phone: string;
  username: string;
}
export interface StudentId {
  id: number;
}

export interface StudentProp {
  student: StudentUser;
}

//types for comment

export interface Course {
  id: number;
  fullname: string;
}

export interface MentorUser {
  city: string;
  email: string;
  firstName: string;
  id: number;
  family: string;
  mobile: string;
  phone: string;
  roles: Array;
  username: string;
}
export interface Comment {
  isChecked: boolean;
  comment: string;
  createTime: string;
  id: number;
  sessionDate: string;
  sessionProblem: string;
  studentContribute: string;
  isStudentPresent: true;
  studentTask: string;
  updateTime: string;
  studentUser: StudentUser;
  course: Course;
  commenterUser: MentorUser;
}

export interface CommentTable {
  comment: string;
  commenterUser: MoodleUser;
  course: MoodleCourse;
  createTime: string;
  id: number;
  isChecked: boolean;
  role: string;
  studentUser: MoodleUser;
  updateTime: string;
}


export interface editCommentProp {
  // editId: number | null;
  openEditState: boolean;
  shareComment: any;
  setOpenEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshByEdit: React.Dispatch<React.SetStateAction<number>>;
}

export interface MoodleUser {
  email: string;
  firstName: string;
  id: number;
  family: string;
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
//this is just for admin
export interface moodleJustStudent {
  id: number;
  moodleRole: {
    userRole: "student";
  };
  contextId: number;
  moodleUser: MoodleUser;
  epochTimeModified: number;
}
//this is for mentor/ta
export interface MoodleUserAssignee {
  user_id: number;
  role: {
    name: string;
    userRole: string;
    roleId: number;
  };
  assigneeContext: {
    student: {
      studentUserName: string;
      studentEmail: string;
      studentFirstName: string;
      studentLastName: string;
      studentCity: string;
      studentPhone: string;
      studentMobile: string;
      studentId: number;
    };
  };
  id: number;
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
  codeMeli?: string;
  firstName: string;
  family: string;
  province?: string;
  city?: string;
  gender?: string;
  birthDate?: string;
  mobile?: string;
  email?: string;
  familiarity?: string;
  education?: string;
  studyField?: string;
  selectedField?: string;
  description?: string;
  token?: string;
  highSchoolYear?: string;
  refer?: string;
  createTime?: string;
  highSchoolYear?: string;
  refer?: string;
  course?: string;
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
  moodleUser?: MoodleUser; //i'm not sure yet is possibly exist for all or not
}

export interface TableBodyAllType extends RegistrationForm {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  resultStatus?: string;
  checkBoxDisplay?: boolean;
  idMulti?: number;
  // roles: string;
  directNav: string;
}

export interface SeekerStudent {
  id: number;
  registrationCode: string;
  regForm: RegistrationForm;
  regChecked: boolean;
  beforeWeekForm: BeforeWeekType;
  beforeWeekChecked: boolean;
  afterWeekForm: AfterWeekType;
  afterWeekChecked: true;
}

export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  country: string;
  city: string;
  mobile: string;
  email: string;
  role: string;
  imageAddress: string;
  lastEduLevel: string;
  lastMajor: string;
  lastEduLocation: string;
  currentJob: string;
  currentJobLocation: string;
  website: string;
  linkedin: string;
  gitlab: string;
  github: string;
  researchgate: string;
  custom: string;
  aboutMe: string;
  id: number;
  createTime: string | null;
  updateTime: string | null;
  deleteTime: string | null;
  deleted: boolean;
  user: {
    username: string;
    idnumber: string;
    firstName: string;
    lastName: string;
    email: string;
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
    id: number;
  };
}

export type ApprovalStatus = "pending" | "approved" | "rejected" | "all" | null;
