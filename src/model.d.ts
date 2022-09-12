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

//types for the learner
interface RolesInLearner {
  archeType: string;
  description: string;
  id: number;
  name: string;
  userRole: string;
}
export interface Learner {
  firstName: string;
  id: number;
  lastName: string;
  roles: RolesInLearner[];
  username: string;
}

export interface learnerProp {
  learner: Learner;
}