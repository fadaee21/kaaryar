import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const AllComments = () => {
  const {
    auth: { roles },
  } = useAuth();
  const navigate = useNavigate();

  const roleNavigate = (roleCommentsWatch: string) => {
    navigate(`/${roles[0]}/all-comments/${roleCommentsWatch}`);
  };
  console.log(roles[0]);

  if (roles[0] === "mentor") {
    return (
      <Box sx={{ width: 300, ml: "auto", mr: "auto" }}>
        <p>mentor comments</p>
        <button onClick={() => roleNavigate("mentor")}>watch</button>
        {/* <p>ta comments</p>
        <button onClick={() => roleNavigate("ta")}>watch</button> */}
      </Box>
    );
  }
  if (roles[0] === "ta") {
    return (
      <Box sx={{ width: 300, ml: "auto", mr: "auto" }}>
        <p>ta comments</p>
        <button onClick={() => roleNavigate("ta")}>watch</button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 300, ml: "auto", mr: "auto" }}>
      {/* <p>mentor comments</p>
      <button onClick={() => roleNavigate("mentor")}>watch</button> */}
      <p>mentor comments</p>
      <button onClick={() => roleNavigate("mentor")}>watch</button>
      <p>ta comments</p>
      <button onClick={() => roleNavigate("ta")}>watch</button>
    </Box>
  );
};

export default AllComments;
