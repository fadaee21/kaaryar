import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/request/useGetData";
import { Comment } from "../../model";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";
const allCommentLink = `total/all?pageNum=1&pageSize=3`;

const LastOpinionDash = () => {
  const {
    dataCall,
    loadingCall,
    getAllData,
  }: {
    dataCall: Comment[];
    loadingCall: boolean;
    getAllData: (address: string) => Promise<void>;
  } = useGetData();
  const navigate = useNavigate();
  useEffect(() => {
    getAllData(allCommentLink);
  }, [getAllData]);

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
      {dataCall?.map((item: Comment) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          key={item.id}
        >
          <Typography variant="body2">
            {item.commenter?.firstName} {item.commenter?.family} برای{" "}
            {item.student.firstName} {item.student.family}
            {item.createTime &&
              ` در ${new Intl.DateTimeFormat("fa-iran", { dateStyle: "full" })
                .format(new Date(item.createTime))
                .replace(",", "")
                .split(" ")
                .reverse()
                .join(" ")}`}
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
