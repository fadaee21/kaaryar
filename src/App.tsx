import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

export enum Roles {
  admin = 9999,
  mentor = 4444,
  teacher = 5555,
  ta = 3333,
}

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<h1>unauthorized</h1>} />

          <Route element={<RequireAuth allowedRoles={[Roles.admin]} />}>
            <Route path="user" element={<h1>admin</h1>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.mentor]} />}>
            <Route path="editor" element={<h1>mentor</h1>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.ta]} />}>
            <Route path="admin" element={<h1>ta</h1>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.teacher]} />}>
            <Route path="admin" element={<h1>teacher</h1>} />
          </Route>
          <Route path="*" element={<h1>not found</h1>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
