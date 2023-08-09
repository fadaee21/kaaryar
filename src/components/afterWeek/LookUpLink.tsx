import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { editAxios, getData } from "../../api/axios";
import { AfterWeekType, MoodleUser } from "../../model";

interface LookUpLinkType {
  student: AfterWeekType | undefined;
  id: string | undefined;
  refreshingPage?: () => void;
}

//^in this component there is complexity about type! type of oneStudent (show as primary value if exist) is afterWeekType
//^but after selecting new value from combo box type will change to the moodleJustStudent...
//^it cause problem for getOptionLabel and value...it force me to change them as conditional value and define type as any for oneStudent and getOptionLabel

const LookUpLink = ({ student, id, refreshingPage }: LookUpLinkType) => {
  const [students, setStudents] = useState<MoodleUser[]>([]); //get All Student in moodle
  const [oneStudent, setOneStudent] = useState<any>(student); // get One student from after week
  const [loading, setLoading] = useState(true);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  // const allStudentMoodle = `moodle/user/student/all?pageNum=1&pageSize=10000`;
  const allStudentMoodle = `/moodle/user/role/all?role=student&pageNum=1&pageSize=10000&orderAscending=false&orderBy=lastFirstName`;
  const oneStudentLink = `exam/after/week/form/${id}`;
  const approvedStu = student?.afterWeekChecked; // approvedStu help: false:don't show this component.true: just show whose link and related message. null: show whose link and let choose or edit it again!
  //get all list
  useEffect(() => {
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
    approvedStu ?? getListLearner();
  }, [allStudentMoodle, approvedStu]);

  //clear the feedBackMessage
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFeedBackMessage(" ");
  //   }, 4000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [feedBackMessage]);

  //edit user
  const handleLinkStudent = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await editAxios(oneStudentLink, {
        data: { form: { moodleUserId: oneStudent?.id } },
      });
      if (response.status === 200) {
        setFeedBackMessage("درخواست با موفقیت انجام شد");
        refreshingPage?.();
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

  //if user not disApproved,don't show anything
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
          mt: 5,
        }}
      >
        <Autocomplete
          options={students}
          getOptionLabel={(option) =>
            option?.firstName +
            " " +
            (option?.family ? option.family : option?.lastName) +
            " " +
            `(${option?.username})`
          }
          id="close-on-select"
          sx={{ mr: 10 }}
          fullWidth
          value={
            oneStudent?.moodleUser //if you have been linked user and data comes from after week, so show that info
              ? oneStudent?.moodleUser
              : oneStudent?.firstName //if you want to select new moodle student so change the value of the input (there is 2 conditional because the data from after week comes or data selected from moodle is different)
              ? oneStudent
              : null
          }
          isOptionEqualToValue={(option, value) => option.moodleUser === value}
          onChange={(_event, newValue) => {
            setOneStudent(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="لینک کردن کاربر" />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option?.firstName +
                " " +
                (option?.family ? option.family : option?.lastName)}
            </Box>
          )}
          readOnly={approvedStu}
        />
        <Button
          sx={{ ...(approvedStu === true ? { display: "none" } : {}) }}
          variant="contained"
          color="secondary"
          onClick={handleLinkStudent}
        >
          {loading ? "بارگذاری..." : "ثبت"}
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

