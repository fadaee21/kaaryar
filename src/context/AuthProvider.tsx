import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthType } from "../model";

function useProviderAuthValue() {
  const [storedValue, setValue] = useLocalStorage("user", null);
  const [auth, setAuth] = useState<AuthType>(storedValue);
  useEffect(() => {
    setValue(auth);
  }, [auth, setValue]);
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
