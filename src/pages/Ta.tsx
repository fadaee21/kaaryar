import React, { useEffect, useState } from "react";
import { useGetLearnerList } from "../hooks/useGetLearnerList";
import { Box, Container, Pagination } from "@mui/material";
import { Learner } from "../model";
import Typography from "@mui/material/Typography";
import ListLearnerItem from "../components/ListLearnerItem";
import LoadingProgress from "../components/LoadingProgress";

const Ta = () => {
  const [page, setPage] = useState(0);

  const { getListLearner, learners, loading } = useGetLearnerList(page);

  useEffect(() => {
    getListLearner();
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box component={"section"}>
      <Container maxWidth="lg">
        {/* //Todo: change the text */}
        <Typography variant="h3" color={"textPrimary"} sx={{ my: 5 }}>
          لیست نفرات
        </Typography>

        {learners.map((learner: Learner) => (
          <ListLearnerItem key={learner.id} learner={learner} />
        ))}
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 5,
          }}
          size="large"
          count={16}
          variant="outlined"
          shape="rounded"
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value - 1);
          }}
        />
      </Container>
    </Box>
  );
};

export default Ta;
