import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Box
        component={"main"}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          mb: pathname === "/" ? 0 : 10,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
