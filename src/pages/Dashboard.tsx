import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../api/axios";
import LoadingProgress from "../components/LoadingProgress";
// import  Pagination  from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import StudentCard from "../components/StudentCard";
import { MoodleUser } from "../model";

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line 
  const [page, setPage] = useState(15);
  //i select 15, Aimless! it could be pagination or sth else
  const navigate = useNavigate();
  const allStudentMoodle = `moodle/user/all?pageNum=${page}&pageSize=9`;

  const getListLearner = async () => {
    setLoading(true);

    try {
      let response = await getData(allStudentMoodle);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 5 }}>
      <Grid container spacing={4}>
        {students.map((moodleUser: MoodleUser) => {
          return (
            <Grid item key={moodleUser.id} xs={12} md={6} lg={4}>
              <StudentCard moodleUser={moodleUser} />
            </Grid>
          );
        })}
      </Grid>
      {/* <Pagination
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
      /> */}
    </Box>
  );
};
