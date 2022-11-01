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
  id: 9;
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
