import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Box
        component={"main"}
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
