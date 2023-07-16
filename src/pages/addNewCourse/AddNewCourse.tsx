import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  OutlinedInput,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Instructor } from "../../model";
import useSWR from "swr";
import { editAxios, postData } from "../../api/axios";
import CoreFields from "../../components/addNewCourseComp/CoreFields";
import WorkshopFields from "../../components/addNewCourseComp/WorkshopFields";
import VocationalFieldsAndEnglish from "../../components/addNewCourseComp/VocationalFieldsAndEnglish";
import { JalaliDatePicker } from "../../components/comment/JalaliDatePicker";
import RelatedGroup from "../../components/addNewCourseComp/RelatedGroup";

import {
  convertArrToStr,
  getNameAndId,
  getTypeAndSubtype,
} from "../../utils/courseMethod";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import {
  englishDataTypeCourse,
  statusCourseOpt,
  typeOfCourse,
} from "./addNewCourseHelper";
import { ComboBoxAddCourse } from "./ComboBoxAddCourse";
import EnglishFields from "../../components/addNewCourseComp/EnglishFields";

interface courseTypeProp {
  name: string;
  id: number;
}
interface courseNameResponse {
  instructors: Instructor[];
  startDate: Date;
}
type LiftUpStateType = {
  [index: string]: string;
};

const AddNewCourse = () => {
  const navigate = useNavigate();
  const [keyTypeCourse, setKeyTypeCourse] = useState<string | null>(null);
  //give type of course and get all course name
  const { data: dataTypeCourse, isLoading: loadingTypeCourse } =
    useSWR<courseTypeProp[]>(keyTypeCourse); //get data for نام دوره
  const [courseNameId, setCourseNameId] = useState<string>("");
  const [courseIdVal, courseNameVal] = getNameAndId(courseNameId); //destruct name and id from courseNameId string
  const keyNameCourse =
    courseNameId && dataTypeCourse ? `/modules/details/${courseIdVal}` : null;
  //give course id and get all course information
  const { data: dataNameCourse } = useSWR<courseNameResponse>(keyNameCourse); // get data for all values in form

  const [courseType, setCourseType] = useState("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [moduleCategoryId, setModuleCategoryId] = useState<undefined | string>(
    undefined
  ); //Group
  const [liftUpState, setLiftUpState] = useState<LiftUpStateType>({});
  const [numberOfHours, setNumberOfHours] = useState<undefined | string>(
    undefined
  );
  const [teachingStatus, setTeachingStatus] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleType, subType] = getTypeAndSubtype(courseType); //destruct type and subType value
  const [nonLmsInstructors, setNonLmsInstructors] = useState<
    string | undefined
  >(); //instructors for english only can write
  useEffect(() => {
    setCourseNameId("");
    setErrMsg(false);
  }, [courseType]);

  //finding the LINK of request:for english remove hasCategory=false and else set null to disable SWR
  useEffect(() => {
    if (subType === "workshop") {
      setKeyTypeCourse(
        `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=true&orderBy=name&hasCategory=false&isImported=false&${courseType}`
      );
    } else if (courseType) {
      setKeyTypeCourse(
        `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=true&orderBy=name&hasCategory=false&${courseType}`
      );
    } else {
      setKeyTypeCourse(null);
    }
  }, [courseType, subType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrMsg(false);
    e.preventDefault();
    //handling error and guiding for compulsory field
    if ([courseType, courseNameId].some((val) => !val)) {
      toast.error("فیلد های اجباری پر شود");
      setErrMsg(true);
      return;
    }
    if (
      ["workshop", "english_module"].every((i) => i !== subType) &&
      !moduleCategoryId
    ) {
      toast.error("فیلد های اجباری پر شود");
      setErrMsg(true);
      return;
    }
    if (subType !== "workshop" && !teachingStatus) {
      toast.error("فیلد های اجباری پر شود");
      setErrMsg(true);
      return;
    }
    let careerPathwayId;
    if (moduleType === "core" && !liftUpState.careerPathwayId) {
      toast.error("فیلد های اجباری پر شود");
      setErrMsg(true);
      return;
    } else {
      careerPathwayId = getNameAndId(liftUpState.careerPathwayId)[0]; //destruct name and id from careerPathwayId string
    }
    try {
      setLoading(true);
      let res;
      if (courseType.includes("english")) {
        res = await postData("/modules/new", {
          data: {
            name: courseNameVal,
            description,
            numberOfHours,
            moduleType,
            subType,
            startDate: startDate ?? liftUpState.startDate,
            endDate: endDate ?? liftUpState.endDate,
            moduleCategoryId,
            careerPathwayId,
            weblinkLmsCourse: liftUpState.weblinkLmsCourse,
            teachingStatus,
            nonLmsInstructors,
          },
        });
      } else {
        res = await editAxios(`/modules/${courseIdVal}`, {
          data: {
            name: courseNameVal,
            description,
            numberOfHours,
            moduleType,
            subType,
            startDate: startDate ?? liftUpState.startDate,
            endDate: endDate ?? liftUpState.endDate,
            weblinkFinalProject: liftUpState.weblinkFinalProject,
            moduleCategoryId,
            careerPathwayId,
            weblinkLmsCourse: liftUpState.weblinkLmsCourse,
            teachingStatus,
            isImported: subType === "workshop" ? true : null,
          },
        });
      }
      console.log(res);
      console.log(getTypeAndSubtype(courseType));
      if (res.status === 200) {
        if (moduleType === "core") {
          navigate("/admin/core-course");
          return;
        }
        if (subType === "workshop") {
          navigate("/admin/general-course?tab=0");
          return;
        }
        if (subType === "english_module") {
          navigate("/admin/general-course?tab=1");
          return;
        }
        if (subType === "vocational_skills") {
          navigate("/admin/general-course?tab=2");
          return;
        }
        if (subType === "interpersonal_skills") {
          navigate("/admin/general-course?tab=3");
          return;
        }
      } else {
        toast.error("دوره جدید ایجاد نشد");
        setErrMsg(true);
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <form onSubmit={handleSubmit}>
          <header>
            <Stack direction="row" sx={{ alignItems: "flex-start", mb: 10 }}>
              <Typography
                sx={{ mr: "auto" }}
                variant="h5"
              >{`افزودن دوره جدید`}</Typography>
              <Button variant="outlined" type="submit" sx={{ mr: 2, px: 5 }}>
                ذخیره
              </Button>
              <Button
                variant="outlined"
                sx={{ px: 5 }}
                color="inherit"
                endIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                بازگشت
              </Button>
            </Stack>
          </header>
          <Grid container rowSpacing={4} columnSpacing={8}>
            <Grid item xs={6}>
              <FormControl fullWidth error={!courseType && errMsg}>
                <InputLabel id="courseType-label">نوع دوره</InputLabel>
                <Select
                  labelId="courseType-label"
                  id={courseType}
                  name={courseType}
                  value={courseType}
                  label="نوع دوره"
                  onChange={(e) => setCourseType(e.target.value)}
                >
                  {typeOfCourse.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                disabled={!dataTypeCourse || loadingTypeCourse}
                fullWidth
                error={!courseNameId && errMsg}
              >
                <InputLabel id="course-name-label">نام دوره</InputLabel>
                <Select
                  labelId="course-name-label"
                  id="course-name"
                  value={courseNameId}
                  label="نام دوره"
                  onChange={(e) => setCourseNameId(e.target.value.toString())}
                >
                  {(subType === "english_module"
                    ? englishDataTypeCourse
                    : dataTypeCourse
                  )?.map((item) => (
                    <MenuItem key={item.id} value={`${item.id} + ${item.name}`}>
                      {/*the reason of scheme of value: i need both name and id while MenuItem just let me send a single string or number */}
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {subType === "english_module" && courseNameId && (
              <EnglishFields
                description={description}
                endDate={endDate}
                errMsg={errMsg}
                numberOfHours={numberOfHours}
                setDescription={setDescription}
                setEndDate={setEndDate}
                setLiftUpState={setLiftUpState}
                setNumberOfHours={setNumberOfHours}
                setStartDate={setStartDate}
                setTeachingStatus={setTeachingStatus}
                startDate={startDate}
                statusCourseOpt={statusCourseOpt}
                teachingStatus={teachingStatus}
                nonLmsInstructors={nonLmsInstructors}
                setNonLmsInstructors={setNonLmsInstructors}
              />
            )}

            {dataNameCourse && (
              <>
                {/* instructors exist in all below components */}
                <Grid item xs={12} md={6}>
                  <FormControl disabled fullWidth>
                    <InputLabel htmlFor="instructors-amount">
                      مدرس(ها)
                    </InputLabel>
                    <OutlinedInput
                      id="instructors-amount"
                      label="مدرس(ها)"
                      defaultValue={
                        dataNameCourse &&
                        convertArrToStr(dataNameCourse.instructors)
                      }
                      multiline
                      rows={4}
                      inputProps={{
                        style: {
                          height: 28,
                          overflowY: "auto",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                {moduleType === "core" && (
                  <CoreFields setLiftUpState={setLiftUpState} errMsg={errMsg} />
                )}
                {subType === "workshop" && (
                  <WorkshopFields
                    setLiftUpState={setLiftUpState}
                    startDateProp={dataNameCourse?.startDate}
                  />
                )}

                {courseNameId && subType === "vocational_skills" && (
                  <VocationalFieldsAndEnglish setLiftUpState={setLiftUpState} />
                )}
                {subType !== "workshop" && (
                  <>
                    <Grid item xs={12} md={6}>
                      <ComboBoxAddCourse
                        label="وضعیت دوره"
                        identifier="statusCourse"
                        options={statusCourseOpt}
                        handleChange={(e) => setTeachingStatus(e.target.value)}
                        val={teachingStatus}
                        error={!teachingStatus && errMsg}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RelatedGroup
                        errMsg={errMsg}
                        state={moduleCategoryId}
                        setState={setModuleCategoryId}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack>
                        <JalaliDatePicker
                          setSessionDate={setStartDate}
                          sessionDate={startDate}
                          label="تاریخ شروع آموزش دوره"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack>
                        <JalaliDatePicker
                          setSessionDate={setEndDate}
                          sessionDate={endDate}
                          label="تاریخ پایان آموزش دوره"
                        />
                      </Stack>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="numberOfHours">
                      تعداد ساعات دوره
                    </InputLabel>
                    <OutlinedInput
                      id="numberOfHours"
                      label="تعداد ساعات دوره"
                      value={numberOfHours}
                      onChange={(e) => setNumberOfHours(e.target.value)}
                      type="number"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="description">توضیحات</InputLabel>
                    <OutlinedInput
                      id="description"
                      label="توضیحات"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddNewCourse;
