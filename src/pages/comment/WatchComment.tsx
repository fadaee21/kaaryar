import { Box } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";

const WatchComment = () => {
  const { allComment, loading } = useGetOneComment();

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{m:5}}>
      <div>{allComment?.comment}</div>
      <div>{allComment?.studentContribute}</div>
      <div>{allComment?.sessionProblem}</div>
      <div>{allComment?.studentTask}</div>
      <div>{allComment?.course?.courseName}</div>
    </Box>
  );
};

export default WatchComment;
