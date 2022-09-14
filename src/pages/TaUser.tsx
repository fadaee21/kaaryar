import React, { useEffect, useState } from "react";

import { Box, Container, Pagination } from "@mui/material";

import Typography from "@mui/material/Typography";
import LoadingProgress from "../components/LoadingProgress";
import { StudentUser } from "../model";
import ListStudentItem from "../components/ListStudentItem";
import { useGetStudentList } from "../hooks/request/useGetStudentList";

const TaUser = () => {
  const [page, setPage] = useState(0);

  const { students, getListStudent, loading } = useGetStudentList(page);

  useEffect(() => {
    getListStudent();
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

        {students.map((student: StudentUser) => (
          <ListStudentItem key={student.id} student={student} />
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

export default TaUser;
