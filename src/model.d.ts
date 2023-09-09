export type RoleType = "admin" | "mentor" | "ta" | "teacher" | null;
export type TypeComp = "beforeWeek" | "afterWeek" | "seeker" | "student";
export interface AuthType {
  username: string;
  password?: string;
  roles: RoleType[];
  id: number | null;
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

export interface StudentComment {
  role: string;
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
}
// export interface Comment {
//   isChecked: boolean;
//   comment: string;
//   createdAt: string;
//   id: number;
//   sessionDate: string;
//   sessionProblem: string;
//   studentContribute: string;
//   isStudentPresent: true;
//   studentTask: string;
//   updateTime: string;
//   studentUser: StudentComment;
//   course: ModulesAsStudentModule;
//   commenter: StudentComment;
// }

export interface Comment {
  isChecked: boolean;
  comment: string;
  studentContribution: string | null;
  sessionDate: string;
  studentPresent: string;
  sessionProblem: string;
  studentTask: string;
  studentId: number;
  moduleId: number;
  commenterId: number;
  isDeleted: boolean;
  id: number;
  createdAt: string;
  updateTime: string | null;
  deleteTime: string | null;
  commenterRole: string;
  student: StudentComment;
  commenter: StudentComment;
  module: ModulesAsStudentModule;
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
  registrationForm: RegistrationForm | null;
  statusForm: StatusForm | null;
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
  registrationCode?: string;
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
  careerPathwayOther?: string;
  highSchoolYear?: string;
  uniSemester?: string;
  refer?: string;
  createdAt?: string;
  highSchoolYear?: string;
  course?: string;
  decidedAt?: string | null;
}

export interface BeforeWeekType {
  registrationForm: RegistrationForm;
  acceptWeekChecked: boolean | null;
  accessTime: string;
  avgSalary: string;
  applicantAdditionalComments: string;
  cgpa?: string;
  charity: string;
  codingKnowledge: ?string;
  computerAccess: string;
  computerFamiliarity: string[] | null;
  contCourseApproach: string;
  currentField: string;
  currentInstName: string;
  instituteCurrentType: string;
  eduLevel: string;
  eduStatus: string;
  familiar: string;
  accessTime: string;
  instituteType: string;
  internetAccessDevice: string;
  jobReady: boolean;
  jobStandby: boolean;
  jobStatus: boolean;
  jobTitle: string;
  jobType: string;
  jobVision: string;
  lastInstitute: string;
  limitTime: string;
  motivation: string;
  // paymentImageAddress: string;
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
  noneJobActivation: string[] | null;
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
  motivationByAdmin: string | null;
  decidedAt?: string;
}

interface AfterWeekType {
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
  fundamentalSkillsScore: string;
  paymentImageAddress: string;
  notifyAcceptWeek: string;
  workshopCont: string;
  firstSelectJobRoad: string;
  moodleUser?: MoodleUser; //i'm not sure yet is possibly exist for all or not
  beforeWeekForm: BeforeWeekType;
  decidedAt?: string;
}

export interface TableBodyAllType extends RegistrationForm {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  resultStatus?: string;
  checkBoxDisplay?: boolean;
  // idMulti?: number;
  // roles: string;
  directNav: string;
  motivation?: string;
  finalField?: string;
  finalResults?: string;
  jobStandby?: boolean;
  scholar?: boolean;
  finalResult?: string;
  contCourseApproach?: string;
  index: number;
}

export interface SeekerStudent {
  id: number;
  registrationCode: string;
  regForm: RegistrationForm;
  regChecked: boolean;
  BeforeWeekForm?: BeforeWeekType;
  beforeWeekChecked: boolean;
  AfterWeekForm?: AfterWeekType;
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
  custom: string | null;
  aboutMe: string;
  id: number;
  createdAt: string | null;
  updateTime: string | null;
  deleteTime: string | null;
  deleted: boolean;
  user: UserProfile;
  picture: Picture | null;
}
export interface UserProfile {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
}
export interface Picture {
  file_hash: string;
  file_name: string;
  file_type: string;
  file_extension: string;
  file_size: number;
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

export type TableHeaderProps = { headerItems: string[]; status?: any };

//!Education
// /modules/categories/all
export interface Instructor {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
  roles?: Role[];
  picture?: any;
}

export interface TeachingAssistant {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
}

export interface Mentor {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
}

export interface StudentEdu {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
  picture: Picture;
  roles: Role[];
}
export type ModuleType = "core" | "general";
export type ModuleSubType =
  | "workshop"
  | "unassigned"
  | "english_module"
  | "interpersonal_skills"
  | "vocational_skills";

export interface ModuleGroup {
  name: string;
  description: any;
  moduleType: ModuleType;
  subType: ModuleSubType;
  isActive: boolean;
  teachingStatus: any;
  levelName: any;
  startDate: any;
  endDate: any;
  weblinkFeedbackForm: any;
  weblinkFinalProject: any;
  weblinkLmsCourse: any;
  id: number;
  createdAt: string;
  updatedAt: any;
}
export interface Group {
  name: string;
  groupCode: string;
  description: any;
  isActive: boolean;
  startDate: any;
  endDate: any;
  id: number;
  createdAt: string;
  updatedAt: any;
  modules: ModuleGroup[];
  instructors: Instructor[];
  teachingAssistants: TeachingAssistant[];
  mentors: Mentor[];
  students: Student[];
}

export type GroupArray = Group[];

// short Group
export interface ShortGroup {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  groupCode: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  id: number;
  createdAt: string;
  updatedAt?: string;
}

// /modules/all
export interface CareerPathway {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  description: any;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: any;
}
export interface Category {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  groupCode: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  id: number;
  createdAt: string;
  updatedAt: any;
}

export interface ModuleAll {
  name: string;
  description: any;
  moduleType: string;
  subType: ModuleSubType;
  isActive: boolean;
  teachingStatus: any;
  levelName?: string;
  startDate: any;
  endDate: any;
  weblinkFeedbackForm: any;
  weblinkFinalProject: any;
  weblinkLmsCourse: any;
  id: number;
  createdAt: string;
  updatedAt: any;
  category: Category;
  careerPathway: CareerPathway;
  instructors: Instructor[];
  teachingAssistants: TeachingAssistant[];
  mentors: Mentor[];
  students: Student[];
}

export type ModuleAllArray = ModuleAll[];

//short detail for module core
export interface ShortCoreModule {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  description: string;
  moduleType: string;
  subType: ModuleSubType;
  isActive: boolean;
  teachingStatus: string;
  levelName: any;
  startDate: Date | dayjs.Dayjs | null;
  endDate: Date | dayjs.Dayjs | null;
  weblinkFeedbackForm: string;
  weblinkFinalProject: string;
  weblinkLmsCourse: string;
  id: number;
  createdAt: string;
  updatedAt?: string;
  category: Category;
  careerPathway: CareerPathway;
  instructors: Instructor[];
  numberOfHours: string;
  deadlineFinalProject: any;
  nonLmsInstructors: string | null;
}

export interface WorkshopShort {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  description: string;
  moduleType: string;
  subType: ModuleSubType;
  isActive: boolean;
  teachingStatus: string;
  levelName: any;
  startDate: string;
  endDate?: string;
  weblinkFeedbackForm?: string;
  weblinkFinalProject?: string;
  weblinkLmsCourse: string;
  id: number;
  createdAt: string;
  updatedAt?: string;
  category: Category;
  careerPathway: CareerPathway;
  instructors: Instructor[];
}

export interface EnglishShort {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  description: string;
  moduleType: string;
  subType: ModuleSubType;
  isActive: boolean;
  teachingStatus: string;
  levelName: string;
  startDate: string;
  endDate: string;
  weblinkFeedbackForm: string;
  weblinkFinalProject: string;
  weblinkLmsCourse: string;
  id: number;
  createdAt: string;
  updatedAt: any;
  category: Category;
  careerPathway: CareerPathway;
  instructors: Instructor[];
  nonLmsInstructors: string | null;
}

//type for student

export interface StudentInfo {
  username: string;
  idnumber: string;
  firstName: string;
  family: string;
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
  roles: Role[];
  picture: Picture;
  infoData: InfoDaum[];
  modulesAsStudent: ModulesAsStudent[];
  modulesAsInstructor: ModulesAsInstructor[];
  modulesAsTA: ModulesAsTa[];
  modulesAsMentor: ModulesAsMentor[];
  statusForm: StatusForm;
}

export interface Role {
  name: string;
  userRole: string;
  description: string;
  archeType: string;
  id: number;
}

export interface Picture {
  imageAddress: string;
  pathnamehash: string;
  userid: any;
  id: number;
}

export interface InfoDaum {
  field: Field;
  data: string;
}

export interface Field {
  name: string;
  id: number;
}

export interface ModulesAsStudent {
  moduleId: number;
  studentId: number;
  assessmentId: number;
  module: ModulesAsStudentModule;
  assessment: ModulesAsStudentAssessment;
}
export interface ModuleAsStudentForDetail extends ModulesAsStudent {
  student: StudentEdu;
}
export interface ModulesAsStudentModule {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssisstantCount: number;
  name: string;
  description: string | null;
  numberOfHours: string | null;
  moduleType?: string;
  subType?: string;
  isActive: boolean;
  isImported: any;
  teachingStatus: any;
  levelName: any;
  startDate: string;
  endDate: string;
  weblinkFeedbackForm: string | null;
  weblinkFinalProject: string | null;
  deadlineFinalProject: string | null;
  weblinkLmsCourse: string | null;
  id: number;
  createdAt: string;
  updatedAt: string | null;
  category: Category | null;
  careerPathway: CareerPathway | null;
  instructors: Instructor[];
}
export interface ModulesAsMentorTA {
  name: string;
  description: any;
  numberOfHours: any;
  moduleType: string;
  subType: ModuleSubType;
  isActive: boolean;
  isImported: any;
  teachingStatus: any;
  levelName: any;
  startDate: string;
  endDate: string;
  weblinkFeedbackForm: any;
  weblinkFinalProject: any;
  deadlineFinalProject: any;
  weblinkLmsCourse: any;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ModulesAsStudentAssessment {
  finalProjectWeblink: string;
  finalProjectGrade: number;
  finalGrade: number;
  attendanceQuality: AssessmentScore;
  homeworkAssessment: AssessmentScore;
  finalAssessment: AssessmentScore | null;
  finalStudentStatus?: AssessmentScore;
  nextModule?: NextModule;
  attendanceGrade: number | null;
}

export interface AssessmentScore {
  value: string;
  id: number;
}

export interface StatusForm {
  afterWeekChecked: boolean;
  beforeWeekChecked: boolean;
  description: string | null;
  regChecked: boolean;
  registrationCode: string;
  kaaryarAssessment: any;
  id: number;
  trainingStatus: DetailStudentStatus | null;
  withdrawalReason: DetailStudentStatus | null;
  nextTrainingStep: DetailStudentStatus | null;
  referralToFinance: DetailStudentStatus | null;
}

export interface DetailStudentStatus {
  value: string;
  id: number;
}
export interface NextModule {
  name: string;
  description?: string;
  numberOfHours: any;
  moduleType: string;
  subType: string;
  isActive: boolean;
  isImported: any;
  teachingStatus?: string;
  levelName: any;
  startDate: string;
  endDate?: string;
  weblinkFeedbackForm?: string;
  weblinkFinalProject?: string;
  deadlineFinalProject?: string;
  weblinkLmsCourse?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  detail: string | DetailError[];
  error: { code: number; message: string; status: string };
}

interface DetailError {
  loc: string[];
  msg: string;
  type: string;
}

export type OptionYesOrNo = {
  value: boolean;
  label: "بله" | "خیر";
};

export interface Notify {
  type: string;
  name: string;
  subject: string;
  body: string;
  isActive: boolean;
  templateId: number;
  createdAt: string;
  updatedAt: string;
}
