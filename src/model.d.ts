export interface AuthType {
  username: string;
  pwd: string;
  id: number;
}

export interface AuthContextType {
  auth: AuthType;
  setAuth: void;
}
