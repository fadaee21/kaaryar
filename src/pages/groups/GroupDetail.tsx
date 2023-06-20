import { Button, Container, Stack, Typography } from "@mui/material";
import GroupDetailShowComp from "../../components/group/detail/GroupDetailShowComp";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcherGet } from "../../api/axios";
import LoadingProgress from "../../components/LoadingProgress";
import { persianDate } from "../../utils/persianDate";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const GROUP_DETAIL = `/modules/categories/details/${groupId}`;

  const { data, isLoading, error } = useSWR(GROUP_DETAIL, fetcherGet);

  if (error) {
    console.log(error);
    navigate("/");
  }
  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start" }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h5">{`فهرست گروه‌ها > گروه ${groupId}`}</Typography>
            <Typography variant="subtitle1">{`ساخته‌شده در ${persianDate(
              data.createdAt
            )}${
              data.updatedAt
                ? `، آخرین ویرایش در ${persianDate(data.updatedAt)}`
                : ""
            }`}</Typography>
          </Stack>
          <Button
            endIcon={<EditIcon />}
            variant="outlined"
            onClick={() => navigate(`/admin/groups/edit/${groupId}`)}
            sx={{ mr: 2, px: 5 }}
          >
            ویرایش
          </Button>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      <GroupDetailShowComp
        startDate={data.startDate}
        groupCode={data.groupCode}
        studentCount={data.studentCount}
        mentorCount={data.mentorCount}
        description={data.description}
        name={data.name}
        endDate={data.endDate}
        teachingAssisstantCount={data.teachingAssisstantCount}
      />
    </Container>
  );
};

export default GroupDetail;
