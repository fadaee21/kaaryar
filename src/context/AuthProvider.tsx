import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthType } from "../model";

function useProviderAuthValue() {
  const [auth, setAuth] = useState<AuthType>();
  return useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
}

export type Context = ReturnType<typeof useProviderAuthValue>;

const AuthContext = createContext<Context | undefined>(undefined);

export const AuthProvider = (props: PropsWithChildren) => {
  const value = useProviderAuthValue();
  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("context can not be undefined");
  return context;
};
