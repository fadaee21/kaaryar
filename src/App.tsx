import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { PersistLogin } from "./components/PersistLogin";
import ListRoutes from "./ListRoutes";

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
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Login />} />
          <Route path="unauthorized" element={<h1>unauthorized</h1>} />
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
            <Route element={<RequireAuth allowedRoles={[Roles.TEACHER]} />}>
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
            </Route>
          </Route>
          <Route path="*" element={<h1>not found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
