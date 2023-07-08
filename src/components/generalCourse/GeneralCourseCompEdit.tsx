import { Grid, OutlinedInput } from "@mui/material";
// import { ShortCoreModule } from "../../../model";

// import { ComboBoxAddCourse } from "../../../pages/addNewCourse/AddNewCourse";
// import TypeAndName from "./TypeAndName";
import { FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
// import RelatedGroup from "../../addNewcourseComp/RelatedGroup";
// import DateAndDescribe from "./DateAndDescribe";
import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ShortCoreModule } from "../../model";
import { editAxios } from "../../api/axios";
import TypeAndName from "../coreCourse/edit/TypeAndName";
import { ComboBoxAddCourse } from "../../pages/addNewCourse/ComboBoxAddCourse";
import { convertArrToStr, getTitle } from "../../utils/courseMethod";
import DateAndDescribe from "../coreCourse/edit/DateAndDescribe";
import RelatedGroup from "../addNewCourseComp/RelatedGroup";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

type LiftUpStateType = {
  [index: string]: string | undefined;
};
interface Prop {
  generalDetail: ShortCoreModule | undefined;
}

const GeneralCourseCompEdit = ({ generalDetail }: Prop) => {
  const {
    category,
    teachingStatus: teachingStatusResponse,
    startDate,
    endDate,
    weblinkLmsCourse: weblinkLmsCourseResponse,
    // instructorCount,
    description,
    name,
    // careerPathway: careerPathwayResponse,
    instructors,
    // weblinkFinalProject: weblinkFinalProjectResponse,
    // studentCount,
    // mentorCount,
    numberOfHours,
    moduleType,
    subType,
    id,
  } = generalDetail ?? {};
  const navigate = useNavigate();
  const [moduleCategoryId, setModuleCategoryId] = useState<undefined | string>(
    category?.id.toString() || undefined
  ); //Group
  const [errMsg, setErrMsg] = useState(false);
  // const [careerPathwayId, setCareerPathwayId] = useState<string | undefined>(
  //   undefined
  // ); //related path
  const [teachingStatus, setTeachingStatus] = useState(
    teachingStatusResponse || undefined
  );
  // const [weblinkFinalProject, setWeblinkFinalProject] = useState(
  //   weblinkFinalProjectResponse || undefined
  // );
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState(
    weblinkLmsCourseResponse || undefined
  );
  const [liftState, setLiftState] = useState<LiftUpStateType>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //handling error and guiding for compulsory field

    try {
      setErrMsg(false);
      await editAxios(`/modules/${id}`, {
        data: {
          name,
          description: liftState.descriptionState,
          numberOfHours: liftState.numberOfHoursState,
          moduleType,
          subType,
          startDate: liftState.startDateState,
          endDate: liftState.endDateState,
          // weblinkFinalProject,
          moduleCategoryId,
          // careerPathwayId,
          weblinkLmsCourse,
          teachingStatus,
        },
      });

      switch (subType) {
        case "workshop":
          navigate("/admin/general-course?tab=0");
          break;
        case "english_module":
          navigate("/admin/general-course?tab=1");
          break;
        case "vocational_skills":
          navigate("/admin/general-course?tab=3");
          break;
        case "interpersonal_skills":
          navigate("/admin/general-course?tab=2");
          break;
        default:
          setErrMsg(true);
          toast.error("دوره جدید ایجاد نشد");
          break;
      }
    } catch (error: any) {
      setErrMsg(true);
      toast.error(handleError(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <Stack direction="row" alignItems="flex-start" sx={{ mb: 10 }}>
          <Typography variant="h6">{`فهرست دوره‌های عمومی > ${getTitle(
            subType
          )} > ${name} > ویرایش`}</Typography>

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
        <TypeAndName
          category={`دوره عمومی: ${getTitle(subType)}`}
          name={name}
        />

        {(subType === "vocational_skills" ||
          subType === "interpersonal_skills") && (
          <Grid item xs={12} md={6}>
            <RelatedGroup
              errMsg={errMsg}
              state={moduleCategoryId}
              setState={setModuleCategoryId}
            />
          </Grid>
        )}
        {/* <Grid item xs={6}>
          <ComboBoxAddCourse
            label="مسیر مرتبط"
            identifier="careerPathwayId"
            options={[
              {
                value: "CareerPathwayId...",
                label: "waiting for value of CareerPathwayId",
              },
            ]}
            handleChange={(e) => setCareerPathwayId(e.target.value)}
            val={careerPathwayId}
          />
        </Grid> */}
        {subType !== "workshop" && (
          <Grid item xs={12} md={6}>
            <ComboBoxAddCourse
              label="وضعیت دوره"
              identifier="statusCourse"
              options={[
                {
                  value: "TeachingStatus...",
                  label: "waiting for value of TeachingStatus",
                },
              ]}
              handleChange={(e) => setTeachingStatus(e.target.value)}
              val={teachingStatus}
            />
          </Grid>
        )}
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
        {/* <Grid item xs={12} md={6}>
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
        </Grid> */}
        <DateAndDescribe
          setLiftState={setLiftState}
          startDate={startDate}
          endDate={endDate}
          description={description}
          numberOfHours={numberOfHours}
          subType={subType}
        />
      </Grid>
    </form>
  );
};

export default GeneralCourseCompEdit;
