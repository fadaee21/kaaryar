import { Box } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";
import { JalaliDatePicker } from "../../components/comment/JalaliDatePicker";

const WatchComment = () => {
  const { allComment, loading } = useGetOneComment();

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 5 }}>
      <JalaliDatePicker
        sessionDate={allComment ? new Date(allComment.sessionDate) : new Date()}
        usageType="watching"
      />
      <div>{allComment?.comment}</div>
      <div>{allComment?.studentContribute}</div>
      <div>{allComment?.sessionProblem}</div>
      <div>{allComment?.studentTask}</div>
      <div>{allComment?.course?.courseName}</div>
    </Box>
  );
};

export default WatchComment;
