import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getData } from "../api/axios";
import LoadingProgress from "../components/LoadingProgress";
import StudentCard from "../components/StudentCard";
import { useAuth } from "../context/AuthProvider";
import { MoodleStudent } from "../model";

const StudentListMoodle = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const allStudentMoodle = `moodle/user/all?pageNum=${page}&pageSize=60`;
  const { auth } = useAuth();

  const getListLearner = async () => {
    try {
      let response = await getData(allStudentMoodle, {
        headers: {
          Authorization: auth!.token,
        },
      });
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
  }, [page]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 5 }}>
      <Grid container spacing={4}>

        {students.map((student: MoodleStudent) => {
          const { moodleUser,id } = student;
          // console.log(moodleUser);
          return (
            <Grid item key={id} xs={12} md={6} lg={4}>
              <StudentCard moodleUser={moodleUser} id={id} />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
        size="large"
        count={24}
        variant="outlined"
        shape="rounded"
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value - 1);
        }}
      />
    </Box>
  );
};
export default StudentListMoodle;
