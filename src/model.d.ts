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

export interface LocalStorage {
  key: string;
  value: {
    roles: string[];
    token: string;
  };
}

export interface RegistrationForm {
  id: number;
  careerPathwayId?: number;
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
  careerPathway?: CareerPathway;
  previousStudent?: string;
  codeMeli?: string;
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
  householdIncome?: string;
  householdMembers?: string;
  MotivationAndGoals?: string;
  scholarshipAppReasons?: string;
  jobTitleScholarShip?: string;
}

interface AfterWeekType {
  id: number;
  careerPathwayId: number | null;
  afterWeekChecked: boolean | null;
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
  careerPathway: CareerPathway | null;
}

export interface TableBodyAllType extends RegistrationForm {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  resultStatus?: string;
  checkBoxDisplay?: boolean;
  // idMulti?: number;
  // roles: string;
  directNav?: "before-week" | "after-week";
  motivation?: string;
  finalField?: string;
  finalResults?: string;
  jobStandby?: boolean;
  scholar?: boolean;
  finalResult?: string;
  contCourseApproach?: string;
  index: number;
  careerPathwayName?: string;
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
  hasLMSUser: boolean;
  pendingBeforeweekSubmission: boolean;
  actions: Action[] | null;
}
export interface Action {
  action: string;
  status: string;
  date?: string;
}

export interface Profile {
  isActive: boolean;
  firstName: string;
  lastName: string;
  gender?: string;
  birthday: string;
  country: string;
  city: string;
  mobile: string;
  email: string;
  role: string;
  imageAddress?: string;
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
  custom?: string;
  aboutMe: string;
  id: number;
  createdAt: string;
  updatedAt?: string;
  deleteTime?: string;
  deleted: boolean;
  user: User;
  picture?: Picture;
  userId: number;
}
export interface VolunteerProfile extends Profile {
  modules: ModuleVolunteerProfile[];
  studentCounts: StudentCountVolunteerProfile[];
}
export interface StudentCountVolunteerProfile {
  module: ModuleGroup;
  assigned_student_count: number;
}

export interface ModuleVolunteerProfile {
  personnelId: number;
  moduleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: any;
  studentsCount: number;
  assignedRole: string;
  module: ModuleGroup;
  studentsList: StudentsListVolunteerProfile[];
}

export interface MentorsAndTa {
  assignmentId: number;
  isActive: boolean;
  studentId: number;
  personnel: Personnel;
  personnelRole: string;
}

export interface StudentsListVolunteerProfile {
  personnelId: number;
  moduleId: number;
  personnelRole: string;
  notes: any;
  isActive: boolean;
  id: number;
  studentId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
  student: StudentInModuleVolunteer | undefined;
  mentorsAndTAs: MentorsAndTa[];
}

export interface StudentInModuleVolunteer {
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
  picture: any;
  registrationForm: RegistrationForm;
  statusForm: StatusForm;
  careerPathway: CareerPathway;
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
  disabled?: boolean;
  placeholder: string;
  identifier: string;
  value: any;
  options:
    | {
        value: any;
        label: string;
      }[]
    | undefined;
  handleChange: (e: SelectChangeEvent<string>) => void;
}

export type TableHeaderProps = { headerItems: string[]; status?: any };
interface RowHeaderStudent {
  id: number;
  label: string;
  minWidth: number;
  align: "right" | "left" | "inherit" | "center" | "justify" | undefined;
}
export type TableHeaderStudentProps = {
  studentHeaderItems: RowHeaderStudent[];
};

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
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
  name: string;
  description: any;
  numberOfHours?: number;
  moduleType: string;
  subType: string;
  isActive: boolean;
  isImported: any;
  teachingStatus: string;
  levelName: any;
  nonLmsInstructors: any;
  startDate: string;
  endDate: string;
  weblinkFeedbackForm: any;
  weblinkFinalProject: any;
  deadlineFinalProject: any;
  weblinkLmsCourse: any;
  id: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  careerPathway?: CareerPathway;
  instructors: Instructor[];
}
export interface Group {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
  name: string;
  groupCode: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate: any;
  id: number;
  createdAt: string;
  updatedAt: string;
  modules: ModuleGroup[];
  instructors: Instructor[];
  teachingAssistants: TeachingAssistantMentorWithProfile[];
  mentors: TeachingAssistantMentorWithProfile[];
  students: studentsGroup[];
}
export interface studentsGroup {
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
  picture?: Picture;
  registrationForm?: RegistrationForm;
  careerPathway?: CareerPathway;
  currentModuleAsStudent?: CurrentModuleAsStudent;
  currentAssignedTA: CurrentAssignedMentorTa;
  currentAssignedMentor: CurrentAssignedMentorTa;
}

export type GroupArray = Group[];

// short Group
export interface ShortGroup {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
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
  teachingAssistantCount: number;
  name: string;
  description: string;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: string | null;
}
export interface Category {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
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
  students: any[];
}

export type ModuleAllArray = ModuleAll[];

//short detail for module core
export interface ShortCoreModule {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
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
  studentsWithDetails: StudentsWithDetailCore[];
  mentors: TeachingAssistantMentorWithProfile[];
  teachingAssistants: TeachingAssistantMentorWithProfile[];
  numberOfHours: string;
  deadlineFinalProject: any;
  nonLmsInstructors: string | null;
}
export interface TeachingAssistantMentorWithProfile {
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
  picture: any;
  profile: Profile;
}
export interface StudentsWithDetailCore {
  moduleId: number;
  studentId: number;
  assessmentId: any;
  assessment: ModulesAsStudentAssessment;
  personnelAssignment: PersonnelAssignment[];
  student: StudentCore;
}
export interface StudentCore {
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
  picture?: Picture;
  registrationForm?: RegistrationForm;
  afterWeekForm?: AfterWeekForm;
  statusForm: StatusForm | null;
}

export interface WorkshopShort {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
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
  teachingAssistantCount: number;
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
  personnelAssignment: PersonnelAssignment[];
}
export interface PersonnelAssignment {
  assignmentId: number;
  personnel: Personnel;
  personnelRole: string;
}

export interface ModuleAsStudentForDetail extends ModulesAsStudent {
  student: StudentWithStatus;
}

export interface StudentWithStatus {
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
  picture: any;
  statusForm: StatusForm;
}

export interface ModulesAsStudentModule {
  instructorCount: number;
  studentCount: number;
  mentorCount: number;
  teachingAssistantCount: number;
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
  kaaryarAssessment: DetailStudentStatus;
  id: number;
  trainingStatus: DetailStudentStatus;
  withdrawalReason: DetailStudentStatus;
  nextTrainingStep: DetailStudentStatus;
  referralToFinance: DetailStudentStatus;
}

export interface DetailStudentStatus {
  value: string;
  id: string | number;
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
export type OptionActive = {
  value: boolean;
  label: "فعال" | "غیرفعال";
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

//admin student table
interface Personnel {
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
export interface CurrentAssignedMentorTa {
  personnel: Personnel;
  personnelRole: string;
  assignmentId: number | null;
  isActive: boolean;
  studentId: number;
}
export interface CurrentModuleAsStudent {
  name: string;
  description: any;
  numberOfHours?: number;
  moduleType?: string;
  subType?: string;
  isActive: boolean;
  isImported: any;
  teachingStatus?: string;
  levelName: any;
  nonLmsInstructors: any;
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
  careerPathway: CareerPathway | null;
  currentAssignedMentor: CurrentAssignedMentorTa | null;
  currentAssignedTA: CurrentAssignedMentorTa | null;
  currentModuleAsStudent: CurrentModuleAsStudent;
  latestEnrolledModule: any;
  latestEnrolledModuleId: any;
}

export interface StudentsVolunteer {
  personnelId: number;
  moduleId: number;
  personnelRole: string;
  notes: any;
  isActive: boolean;
  id: number;
  studentId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
  student: StudentVolunteerObject;
  surveys: Survey[];
  enrollment: Enrollment;
  module: ModulesAsStudentModule;
}

export interface StudentVolunteerObject {
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
  picture: any;
  registrationForm: RegistrationForm;
}

export interface Survey {
  isChecked: boolean;
  comment: string;
  studentContribution: string;
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
  updatedAt: any;
  deleteTime: any;
  commenterRole: string;
}

export interface Enrollment {
  assessment: ModulesAsStudentAssessment;
  assignedTA: Mentor;
  assignedMentor: Mentor;
}
