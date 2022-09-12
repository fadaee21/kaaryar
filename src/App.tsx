import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Teacher from "./pages/Teacher";
import Ta from "./pages/Ta";
import Mentor from "./pages/Mentor";
import Admin from "./pages/Admin";

import DetailLearner from "./pages/DetailLearner";

export enum Roles {
  admin = 9999,
  mentor = 4444,
  teacher = 5555,
  ta = 3333,
}

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<h1>unauthorized</h1>} />
          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[Roles.admin]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/:id" element={<DetailLearner />} />
            {/* </Route> */}
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.mentor]} />}>
            <Route path="mentor" element={<Mentor />} />
            <Route path="mentor/:id" element={<DetailLearner />} />
            {/* </Route> */}
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.ta]} />}>
            <Route path="ta" element={<Ta />} />
            <Route path="ta/:id" element={<DetailLearner />} />
            {/* </Route> */}
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.teacher]} />}>
            <Route path="teacher" element={<Teacher />} />
            <Route path="teacher/:id" element={<DetailLearner />} />
            {/* </Route> */}
          </Route>

          <Route path="*" element={<h1>not found</h1>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
