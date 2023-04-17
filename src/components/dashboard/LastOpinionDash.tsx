import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/request/useGetData";
import { CommentTable } from "../../model";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import { dateConverter } from "../../utils/dateConverter";
import LoadingProgress from "../LoadingProgress";
const allCommentLink = `total/all?pageNum=1&pageSize=3`;

const LastOpinionDash = () => {
  const {
    dataCall,
    loadingCall,
    getAllData,
  }: {
    dataCall: CommentTable[];
    loadingCall: boolean;
    getAllData: (address: string) => Promise<void>;
  } = useGetData();
  const navigate = useNavigate();
  useEffect(() => {
    getAllData(allCommentLink);
  }, []);

  if (loadingCall) {
    return (
      <PaperDashboard>
        <LoadingProgress usage="paper" />
      </PaperDashboard>
    );
  }

  return (
    <PaperDashboard>
      <BoxDashboard>
        <Typography variant="body1">آخرین نظرات</Typography>
      </BoxDashboard>
      {dataCall?.map((item: CommentTable) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          key={item.id}
        >
          <Typography variant="body2">
            {item.commenterUser?.firstName} {item.commenterUser?.family} برای{" "}
            {item.studentUser.firstName} {item.studentUser.family}
            {item.createTime && ` در ${dateConverter(item.createTime)}`}
          </Typography>
          <Button
            size="small"
            variant="text"
            color="info"
            onClick={() => navigate(`/admin/all-comments/${item.id}`)}
          >
            مشاهده
          </Button>
        </Box>
      ))}
    </PaperDashboard>
  );
};

export default LastOpinionDash;
