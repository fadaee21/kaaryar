import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import VolunteerDetailComp from "../../components/profile/VolunteerDetailComp";

import useGetData from "../../hooks/request/useGetData";

const VolunteerDetail = () => {
  const { dataCall, getAllData, loadingCall } = useGetData();
  const { username } = useParams();

  useEffect(() => {
    const person = `/user/profile/username/${username}`;
    getAllData(person);
  }, [username]);

  if (loadingCall) {
    return <LoadingProgress />;
  }
  if (!dataCall.id) {
    return <Navigate replace to={`/notfound`} />;
  }
  return (
    <Container maxWidth="lg">
      <VolunteerDetailComp {...dataCall} usernameParam={username} />
    </Container>
  );
};

export default VolunteerDetail;
