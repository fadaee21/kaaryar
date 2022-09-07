import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      component={"main"}
      sx={{ minHeight: "75vh", display: "flex", flexDirection: "column" }}
    >
      <Outlet />
    </Box>
  );
};

export default Layout;
