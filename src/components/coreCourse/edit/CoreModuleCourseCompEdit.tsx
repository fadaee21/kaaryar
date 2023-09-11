import { Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { ShortCoreModule } from "../../../model";
import useSWR from "swr";
import { ComboBoxAddCourse } from "../../../pages/addNewCourse/ComboBoxAddCourse";
import TypeAndName from "./TypeAndName";
import { FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import RelatedGroup from "../../addNewCourseComp/RelatedGroup";
import DateAndDescribe from "./DateAndDescribe";
import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate } from "react-router-dom";
import { editAxios } from "../../../api/axios";
import { convertArrToStr, getNameAndId } from "../../../utils/courseMethod";
import { RELATED_PATH } from "../../addNewCourseComp/CoreFields";
import { statusCourseOpt } from "../../../pages/addNewCourse/addNewCourseHelper";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";

interface Prop {
  coreDetail: ShortCoreModule | undefined;
}
type LiftUpStateType = {
  [index: string]: string | undefined;
};
interface RelatedPath {
  name: string;
  id: number;
}

const CoreModuleCourseCompEdit = ({ coreDetail }: Prop) => {
  const {
    category,
    teachingStatus: teachingStatusResponse,
    startDate,
    endDate,
    weblinkLmsCourse: weblinkLmsCourseResponse,
    // instructorCount,
    description,
    name,
    careerPathway: careerPathwayResponse,
    instructors,
    weblinkFinalProject: weblinkFinalProjectResponse,
    // studentCount,
    // mentorCount,
    numberOfHours,
    moduleType,
    subType,
    id,
  } = coreDetail ?? {};
  const navigate = useNavigate();
  const [moduleCategoryId, setModuleCategoryId] = useState<undefined | string>(
    category?.id.toString() || undefined
  ); //Group
  const [errMsg, setErrMsg] = useState(false);
  const [careerPathwayIdState, setCareerPathwayIdState] = useState<string>(
    `${careerPathwayResponse?.id} + ${careerPathwayResponse?.name}`
  ); //related path

  const [teachingStatus, setTeachingStatus] = useState(
    teachingStatusResponse || undefined
  );
  const [weblinkFinalProject, setWeblinkFinalProject] = useState(
    weblinkFinalProjectResponse || undefined
  );
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState(
    weblinkLmsCourseResponse || ""
  );
  const [liftState, setLiftState] = useState<LiftUpStateType>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //handling error and guiding for compulsory field
    const [careerPathwayId] = getNameAndId(careerPathwayIdState); //destruct name and id from careerPathwayId string,this complexity is because i have to handle name and id in a string

    try {
      const res = await editAxios(`/modules/${id}`, {
        data: {
          name,
          description: liftState.descriptionState,
          numberOfHours: liftState.numberOfHoursState || undefined,
          moduleType,
          subType,
          startDate: liftState.startDateState,
          endDate: liftState.endDateState,
          weblinkFinalProject,
          moduleCategoryId,
          careerPathwayId,
          weblinkLmsCourse,
          teachingStatus,
        },
      });
      if (res.status === 200) {
        navigate("/admin/core-course");
      } else {
        setErrMsg(true);
        toast.error("دوره جدید ویرایش نشد");
      }
    } catch (error: any) {
      setErrMsg(true);
      toast.error(handleError(error));
    }
  };

  const { data, isLoading, error } = useSWR<RelatedPath[]>(RELATED_PATH);
  if (isLoading) {
    return <></>;
  }
   if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <header>
        <Stack direction="row" alignItems="flex-start" sx={{ mb: 10 }}>
          <Typography variant="h6">{`فهرست دوره‌های تخصصی > ${name} > ویرایش`}</Typography>

          <Button
            variant="outlined"
            type="submit"
            sx={{ mr: 2, px: 5, ml: "auto" }}
          >
            ذخیره
          </Button>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      <Grid container rowSpacing={4} columnSpacing={8}>
        <TypeAndName category={"دوره تخصصی"} name={name} />

        <Grid item xs={12} md={6}>
          <RelatedGroup
            errMsg={errMsg}
            state={moduleCategoryId}
            setState={setModuleCategoryId}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl
            disabled={!data && isLoading}
            fullWidth
            error={!careerPathwayIdState && errMsg}
          >
            <InputLabel id="careerPathwayId-label">مسیر مرتبط</InputLabel>
            <Select
              labelId="careerPathwayId-label"
              id="careerPathwayId"
              value={careerPathwayIdState}
              label="مسیر مرتبط"
              onChange={(e) =>
                setCareerPathwayIdState(e.target.value.toString())
              }
            >
              {data?.map((item) => (
                <MenuItem key={item.id} value={`${item.id} + ${item.name}`}>
                  {/*the reason of value structure: i need both name and id while MenuItem just let me send a single string or number */}
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <ComboBoxAddCourse
            label="وضعیت دوره"
            identifier="statusCourse"
            options={statusCourseOpt}
            handleChange={(e) => setTeachingStatus(e.target.value)}
            val={teachingStatus}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl disabled fullWidth>
            <InputLabel htmlFor="instructors-amount">مدرس(ها)</InputLabel>
            <OutlinedInput
              id="instructors-amount"
              label="مدرس(ها)"
              defaultValue={instructors && convertArrToStr(instructors)}
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
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="weblinkLmsCourse-amount">
              محتوای دوره (لینک به دوره در LMS)
            </InputLabel>
            <OutlinedInput
              id="weblinkLmsCourse-amount"
              label="محتوای دوره (لینک به دوره در LMS)"
              value={weblinkLmsCourse}
              onChange={(e) => setWeblinkLmsCourse(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="weblinkFinalProject-amount">
              پروژه پایانی (لینک به پروژه در LMS)
            </InputLabel>
            <OutlinedInput
              id="weblinkFinalProject-amount"
              label="پروژه پایانی (لینک به پروژه در LMS)"
              value={weblinkFinalProject}
              onChange={(e) => setWeblinkFinalProject(e.target.value)}
            />
          </FormControl>
        </Grid>
        <DateAndDescribe
          setLiftState={setLiftState}
          startDate={startDate}
          endDate={endDate}
          description={description}
          numberOfHours={numberOfHours}
        />
      </Grid>
    </form>
  );
};

export default CoreModuleCourseCompEdit;
