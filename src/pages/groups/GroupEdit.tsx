import { Container } from "@mui/material";

import useSWR from "swr";
import LoadingProgress from "../../components/LoadingProgress";
import { useNavigate, useParams } from "react-router-dom";

import EditGroupComp from "../../components/group/edit-group/EditGroup";

const GroupsEdit = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const GROUP_DETAIL = `/modules/categories/details/${groupId}`;
  const { data, isLoading, error } = useSWR(GROUP_DETAIL);

  if (error) {
    console.log(error);
    navigate("/");
  }
  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <EditGroupComp
        startDateGet={data.startDate}
        endDateGet={data.endDate}
        nameGet={data.name}
        groupCodeGet={data.groupCode}
        descriptionGet={data.description}
        id={data.id}
      />
    </Container>
  );
};

export default GroupsEdit;
