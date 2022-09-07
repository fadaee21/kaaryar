export type RoleType = 9999 | 4444 | 5555 | 3333;

export interface AuthType {
  user: string;
  pwd: string;
  roles: RoleType[];
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
