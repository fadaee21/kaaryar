export type RoleType = 9999 | 4444 | 5555 | 3333;

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