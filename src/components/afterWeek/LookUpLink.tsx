import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { editAxios, getData } from "../../api/axios";
import { AfterWeekType, moodleJustStudent } from "../../model";

interface LookUpLinkType {
  student: AfterWeekType | null;
  id: string | undefined;
}

const LookUpLink = ({ student, id }: LookUpLinkType) => {
  const [oneStudent, setOneStudent] = useState(student); // get One student from after week
  const [students, setStudents] = useState([]); //get All Student in moodle
  const [studentIdLink, setStudentIdLink] = useState<number | undefined>(); // get id student from moodle
  const [loading, setLoading] = useState(true);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const allStudentMoodle = `moodle/user/student/all?pageNum=0&pageSize=10000`;
  const oneStudentLink = `exam/after/week/form/${id}`;
  const approvedStu = student?.afterWeekChecked !== null;
  //get all list
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
    }
  };

  useEffect(() => {
    !approvedStu && getListLearner();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedBackMessage(" ");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [feedBackMessage]);

  // const tt = students.filter(
  //   (i: moodleJustStudent) =>
  //     i.moodleUser.lastName === "امامی" && i.moodleUser.firstName === "زهرا"
  // );
  // console.log("پیدا کردن نفرات تکراری مثلا زهرا امامی:", tt);

  //edit user
  const handleLinkStudent = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await editAxios(oneStudentLink, {
        data: oneStudent,
      });
      if (response.status === 200) {
        setFeedBackMessage("درخواست با موفقیت انجام شد");
        console.log(response.data);
      } else {
        setFeedBackMessage("درخواست انجام نشد");
        console.log(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClick2 = () => {
    // only change the id of moodle user in after week state
    setOneStudent((old: any) => ({
      ...old,
      moodleUser: { ...old.moodleUser, id: studentIdLink },
    }));
  };

  const defaultProps = {
    options: students,
    getOptionLabel: (option: moodleJustStudent) =>
      +option.id +
      "_" +
      option.moodleUser.firstName +
      " " +
      option.moodleUser.lastName,
  };
  useEffect(() => {
    handleClick2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentIdLink]);

  console.log(students.length);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Autocomplete
          {...defaultProps}
          id="close-on-select"
          sx={{ width: 300, mr: 5 }}
          onChange={(_event, newValue) => {
            setStudentIdLink(newValue?.moodleUser?.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              disabled={approvedStu}
              label={
                approvedStu ? "این مهارت آموز تایید شده است" : "لینک کردن کاربر"
              }
            />
          )}
          readOnly={approvedStu}
        />
        <Button
          disabled={!studentIdLink}
          sx={{ ...(approvedStu ? { display: "none" } : {}) }}
          variant="contained"
          color="secondary"
          onClick={handleLinkStudent}
        >
          {loading ? "بارگذاری..." : "تایید"}
        </Button>
      </Box>
      <Typography sx={{ m: 1 }} variant="subtitle2">
        {feedBackMessage}
      </Typography>
    </>
  );
};

export default LookUpLink;
