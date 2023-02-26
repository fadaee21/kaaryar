import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import VolunteerDetailComp from "../../components/profile/VolunteerDetailComp";

import useGetData from "../../hooks/request/useGetData";

const VolunteerDetail = () => {
  const { dataCall, getAllData, loadingCall } = useGetData();
  const { username } = useParams();

  const person = `/user/profile/username/${username}`;

  useEffect(() => {
    console.log(person);
    getAllData(person);
  }, []);

  if (loadingCall) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <VolunteerDetailComp {...dataCall} usernameParam={username} />
    </Container>
  );
};

export default VolunteerDetail;
