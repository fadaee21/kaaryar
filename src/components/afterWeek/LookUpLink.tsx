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

//^in this component there is complexity about type! type of oneStudent (show as primary value if exist) is afterWeekType
//^but after selecting new value from combo box type will change to the moodleJustStudent...
//^it cause problem for getOptionLabel and value...it force me to change them as conditional value and define type as any for oneStudent and getOptionLabel

const LookUpLink = ({ student, id }: LookUpLinkType) => {
  const [students, setStudents] = useState<moodleJustStudent[]>([]); //get All Student in moodle
  const [oneStudent, setOneStudent] = useState<any>(student); // get One student from after week
  const [loading, setLoading] = useState(true);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const allStudentMoodle = `moodle/user/student/all?pageNum=0&pageSize=10000`;
  const oneStudentLink = `exam/after/week/form/${id}`;
  const approvedStu = student?.afterWeekChecked; // approvedStu help: false:don't show this component.true: just show whose link and related message. null: show whose link and let choose or edit it again!
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
    approvedStu ?? getListLearner();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedBackMessage(" ");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [feedBackMessage]);

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

  const defaultProps = {
    options: students,
    getOptionLabel: (option: any) =>
      option?.moodleUser
        ? option.id +
          "_" +
          option?.moodleUser?.firstName +
          " " +
          option?.moodleUser?.lastName
        : option?.firstName + " " + option?.lastName,
  };
  console.log(approvedStu);
  //if user disApproved,don't show anything
  if (approvedStu === false) {
    return <></>;
  }

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
          value={oneStudent ? oneStudent?.moodleUser : null}
          isOptionEqualToValue={(option, value) =>
            option.moodleUser === value.moodleUser
          }
          onChange={(_event, newValue) => {
            setOneStudent(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={"لینک کردن کاربر"} />
          )}
          readOnly={approvedStu}
        />
        <Button
          sx={{ ...(approvedStu === true ? { display: "none" } : {}) }}
          variant="contained"
          color="secondary"
          onClick={handleLinkStudent}
        >
          {loading ? "بارگذاری..." : "تایید"}
        </Button>
      </Box>
      <Typography sx={{ m: 1 }} variant="subtitle2">
        {approvedStu && "این مهارت‌آموز تایید شده است و قابلیت ویرایش ندارد"}
        {feedBackMessage}
      </Typography>
    </>
  );
};

export default LookUpLink;

// این مهارت‌آموز تایید شده است و قابلیت ویرایش ندارد
