
export interface IStudentVolunteerInModule {
  personnelId: number
  moduleId: number
  personnelRole: string
  notes: any
  isActive: boolean
  id: number
  studentId: number
  isDeleted: boolean
  createdAt: string
  updatedAt: any
  deletedAt: any
  student: Student
  mentorsAndTAs: MentorsAndTa[]
  surveys: Survey[]
  enrollment: Enrollment
  module: Module
}

export interface Student {
  username: string
  idnumber: string
  firstName: string
  family: string
  email: string
  phone: string
  mobile: string
  institution: string
  department: string
  address: string
  city: string
  country: string
  lang: string
  timezone: string
  calendarType: string
  id: number
  picture?: Picture
  registrationForm: RegistrationForm
  statusForm: StatusForm
  careerPathway: CareerPathway2
}

export interface Picture {
  imageAddress: string
  pathnamehash: any
  userid: any
  id: number
}

export interface RegistrationForm {
  birthDate?: string
  careerPathwayOther: any
  careerPathwayId?: number
  city: string
  description: string
  education?: string
  email: string
  familiarity?: string
  family: string
  firstName: string
  gender: any
  highSchoolYear: any
  mobile: string
  province?: string
  refer?: string
  selectedField?: string
  studyField?: string
  uniSemester: any
  groupID: number
  course: string
  createdAt: string
  registrationCode: string
  checked: boolean
  id: number
  updatedAt: any
  decidedAt: any
  careerPathway?: CareerPathway
}

export interface CareerPathway {
  instructorCount: number
  studentCount: number
  mentorCount: number
  teachingAssistantCount: number
  name: string
  description: any
  isActive: boolean
  id: number
  createdAt: string
  updatedAt: string
}

export interface StatusForm {
  afterWeekChecked: boolean
  beforeWeekChecked: boolean
  description?: string
  regChecked: boolean
  registrationCode: string
  id: number
  kaaryarAssessment: KaaryarAssessment
  trainingStatus: TrainingStatus
  withdrawalReason: WithdrawalReason
  nextTrainingStep: NextTrainingStep
  referralToFinance: ReferralToFinance
}

export interface KaaryarAssessment {
  value: string
  id: number
}

export interface TrainingStatus {
  value: string
  id: number
}

export interface WithdrawalReason {
  value: string
  id: number
}

export interface NextTrainingStep {
  value: string
  id: number
}

export interface ReferralToFinance {
  value: string
  id: number
}

export interface CareerPathway2 {
  instructorCount: number
  studentCount: number
  mentorCount: number
  teachingAssistantCount: number
  name: string
  description: any
  isActive: boolean
  id: number
  createdAt: string
  updatedAt: string
}

export interface MentorsAndTa {
  assignmentId: number
  isActive: boolean
  studentId: number
  personnel: Personnel
  personnelRole: string
}

export interface Personnel {
  username: string
  idnumber: string
  firstName: string
  family: string
  email: string
  phone: string
  mobile: string
  institution: string
  department: string
  address: string
  city: string
  country: string
  lang: string
  timezone: string
  calendarType: string
  id: number
}

export interface Survey {
  isChecked: boolean
  comment: string
  studentContribution: string
  sessionDate: string
  studentPresent: string
  sessionProblem: string
  studentTask: string
  studentId: number
  moduleId: number
  commenterId: number
  isDeleted: boolean
  id: number
  createdAt: string
  updatedAt?: string
  deleteTime?: string
  commenterRole: string
}

export interface Enrollment {
  assessment: Assessment
  assignedTA: AssignedTa
  assignedMentor?: AssignedMentor
}

export interface Assessment {
  attendanceGrade: any
  finalProjectWeblink: any
  finalProjectGrade: any
  finalGrade: any
  id: number
  attendanceQuality: any
  homeworkAssessment: any
  finalAssessment: any
  finalStudentStatus: any
  nextModule: any
}

export interface AssignedTa {
  username: string
  idnumber: string
  firstName: string
  family: string
  email: string
  phone: string
  mobile: string
  institution: string
  department: string
  address: string
  city: string
  country: string
  lang: string
  timezone: string
  calendarType: string
  id: number
}

export interface AssignedMentor {
  username: string
  idnumber: string
  firstName: string
  family: string
  email: string
  phone: string
  mobile: string
  institution: string
  department: string
  address: string
  city: string
  country: string
  lang: string
  timezone: string
  calendarType: string
  id: number
}

export interface Module {
  instructorCount: number
  studentCount: number
  mentorCount: number
  teachingAssistantCount: number
  name: string
  description: any
  numberOfHours: number
  moduleType: string
  subType: string
  isActive: boolean
  isImported: any
  teachingStatus: string
  levelName: any
  nonLmsInstructors: any
  startDate: string
  endDate: string
  weblinkFeedbackForm: any
  weblinkFinalProject: any
  deadlineFinalProject: any
  weblinkLmsCourse: any
  id: number
  createdAt: string
  updatedAt: string
  category: Category
  careerPathway: CareerPathway3
  instructors: Instructor[]
}

export interface Category {
  instructorCount: number
  studentCount: number
  mentorCount: number
  teachingAssistantCount: number
  name: string
  groupCode: string
  description: string
  isActive: boolean
  startDate: string
  endDate: string
  id: number
  moduleCount: number
  createdAt: string
  updatedAt: string
}

export interface CareerPathway3 {
  instructorCount: number
  studentCount: number
  mentorCount: number
  teachingAssistantCount: number
  name: string
  description: any
  isActive: boolean
  id: number
  createdAt: string
  updatedAt: string
}

export interface Instructor {
  username: string
  idnumber: string
  firstName: string
  family: string
  email: string
  phone: string
  mobile: string
  institution: string
  department: string
  address: string
  city: string
  country: string
  lang: string
  timezone: string
  calendarType: string
  id: number
}
