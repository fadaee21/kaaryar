import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getData } from "../api/axios";
import ListRoutes from "../ListRoutes";
import Sidebar from "./Sidebar";

export const PersistLogin = () => {
  const location = useLocation();
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);

  // just for token validation
  const getValid = async () => {
    setLoadingVal(false);
    try {
      let response = await getData("/moodle/user/20");
      if (response.data) {
        setTokenValidation(true);
      }
      setLoadingVal(true);
    } catch (error) {
      setTokenValidation(false);
      setLoadingVal(true);
    }
  };

  useEffect(() => {
    getValid();
  }, []);

  if (!loadingVal) {
    return <></>;
  }

  return tokenValidation ? (
    <>
      <Sidebar listRoutes={ListRoutes} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
