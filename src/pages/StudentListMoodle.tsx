import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getData } from "../api/axios";
import StudentCard from "../components/StudentCard";
import { useAuth } from "../context/AuthProvider";
import { MoodleStudent } from "../model";

const StudentListMoodle = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const allStudentMoodle = `/moodle/user/all?pageNum=1&pageSize=12`;
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
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
   <Box sx={{m:5}}>
     <Grid container spacing={4}>
      {students.map((student: MoodleStudent) => {
        const { moodleUser } = student;
        return (
          <Grid item key={moodleUser.id} xs={12} md={6} lg={4}>
            <StudentCard moodleUser={moodleUser} />
          </Grid>
        );
      })}
    </Grid>
   </Box>
  );
};
export default StudentListMoodle;
