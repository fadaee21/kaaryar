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

// export interface Comment {
//   checked: unknown;
//   comment: string;
//   sessionDate: string;
//   isStudentPresent: boolean;
//   studentContribute: string;
//   studentTask: string;
//   sessionProblem: string;
//   studentId: number;
//   courseId: unknown;
//   commenterId: number;
//   createTime: string;
//   updateTime: string;
//   deleted: false;
//   id: number;
//   deleteTime: unknown;
// }

export interface CommentTable {
  checked: boolean | null;
  comment: string;
  sessionDate: string;
  isStudentPresent: boolean;
  studentContribute: string;
  studentTask: string;
  sessionProblem: string;
  studentId: number;
  courseId: number;
  mentorId: number;
  createTime: string;
  updateTime: null;
  deleted: false;
  id: number;
  deleteTime: string | null;
  studentUser: MoodleUser;
  commenterUser: MoodleUser;
  course: Course;
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
    imageAddress: string;
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
  checked: boolean | null;
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

  highSchoolYear?: string;
  refer?: string;
  createTime?: string;
  highSchoolYear?: string;
  refer?: string;
  course?: string;
}

export interface BeforeWeekType {
  registrationForm: RegistrationForm;
  acceptWeekChecked: boolean | null;
  accessTime: string;
  avgSalary: string;
  beforeAcceptDesc: string;
  cgpa?: string;
  charity: string;
  codingKnowledge: ?string;
  computerAccess: string;
  computerFamiliarity: string[];
  contCourseApproach: string;
  currentField: string;
  currentInstName: string;
  instituteCurrentType: string;
  eduLevel: string;
  eduStatus: string;
  familiar: string;
  accessTime: string;
  instituteType: string;
  internetAccess: string;
  jobReady: boolean;
  jobStandby: boolean;
  jobStatus: boolean;
  jobTitle: string;
  jobType: string;
  jobVision: string;
  lastInstitute: string;
  limitTime: string;
  motivation: string;
  paymentImageAddress: string;
  codingKnowledge: string;
  questionCity: string;
  questionStudents: string;
  questionNumbers: string;
  questionDiameters: string;
  questionMultiplication: string;
  questionWords: string;
  questionMaths: string;
  questionEnglishFamiliarity: string;
  engPara: string;
  skills: string;
  stuSemester: string;
  stuYear: string;
  transcriptImageAddress: string;
  noneJobActivation: string;
  webDevFamiliarity: string;
  workTime: string;
  id: 1;
  levelAlgorithms: number | undefined;
  levelDataStructures: number | undefined;
  levelDiscreteMath: number | undefined;
  levelFlowDiagrams: number | undefined;
  levelLinearAlgebra: number | undefined;
  levelLogics: number | undefined;
  levelProbabilities: number | undefined;
  isCurrentlyStudent: boolean;
  employmentTimeCommitment: string;
  employmentType: string;
  administrativeComments: string;
  freeDailyTime: string;
  internetAccessTiming: string;
}

interface AfterWeekType {
  beforeWeekForm: BeforeWeekType;
  id: number;
  afterWeekChecked: boolean;
  algoScore: string;
  comAccess: string;
  comAccessStatus: string;
  comScore: string;
  consistCompleteTime: string;
  consistTime: string;
  etcDesc: string;
  ethics: string;
  finalField: string;
  finalResult: string;
  jobCommit: string;
  langScore: string;
  limitAndRisk: string;
  predict: string;
  presentStatus: string;
  recommendField: string;
  recommendFieldMentor: String;
  scholar: boolean;
  scholarPercentage: string;
  workCommit: string;
  algoLevelResult: string;
  comLevelResult: string;
  firstSelectJobRoad: string;
  notifyAcceptWeek: string;
  workshopCont: string;
  moodleUser?: MoodleUser; //i'm not sure yet is possibly exist for all or not
}

export interface TableBodyAllType extends RegistrationForm {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  resultStatus?: string;
  checkBoxDisplay?: boolean;
  idMulti?: number;
  // roles: string;
  directNav: string;
  contCourseApproach?: string;
  finalField?: string;
  jobStandby?: boolean;
  scholar?: boolean;
  finalResult?: string;
  cgpa?: string;
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

export type OptionsString = { label: string; value: string };

export interface PropEditString {
  placeholder: string;
  identifier: string;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
export interface PropEditBool {
  placeholder: string;
  identifier: string;
  value: any;
  handleChange: (e: SelectChangeEvent<string | boolean>) => void;
}
export interface PropEditCombo {
  placeholder: string;
  identifier: string;
  value: any;
  options: {
    value: any;
    label: string;
  }[];
  handleChange: (e: SelectChangeEvent<string>) => void;
}

export type TableHeaderProps = { headerItems: string[] };
