import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import ListRoutes from "./ListRoutes";
import { PersistLogin } from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Unauthorize from "./pages/Unauthorize";
import NotFound from "./pages/NotFound";

export enum Roles {
  ADMIN = "admin",
  MENTOR = "mentor",
  TEACHER = "teacher",
  TA = "ta",
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* //!public routes */}
          <Route index element={<Login />} />
          <Route path="unauthorized" element={<Unauthorize />} />
          {/* //!protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
              {ListRoutes.filter((route) => route.role === "admin").map(
                (route, key) => {
                  return (
                    <Route
                      path={route.path}
                      element={<route.component />}
                      key={key}
                    />
                  );
                }
              )}
            </Route>
            <Route element={<RequireAuth allowedRoles={[Roles.MENTOR]} />}>
              {ListRoutes.filter((route) => route.role === "mentor").map(
                (route, key) => {
                  return (
                    <Route
                      path={route.path}
                      element={<route.component />}
                      key={key}
                    />
                  );
                }
              )}
            </Route>

            <Route element={<RequireAuth allowedRoles={[Roles.TA]} />}>
              {ListRoutes.filter((route) => route.role === "ta").map(
                (route, key) => {
                  return (
                    <Route
                      path={route.path}
                      element={<route.component />}
                      key={key}
                    />
                  );
                }
              )}
            </Route>
            {/* <Route element={<RequireAuth allowedRoles={[Roles.TEACHER]} />}>
              {ListRoutes.filter((route) => route.role === "teacher").map(
                (route, key) => {
                  return (
                    <Route
                      path={route.path}
                      element={<route.component />}
                      key={key}
                    />
                  );
                }
              )}
            </Route> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
