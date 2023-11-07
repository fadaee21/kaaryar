import { Button, Grid } from "@mui/material";
import SearchFirstName from "../../search/SearchFirstName";
import SearchFamily from "../../search/SearchFamily";
import { useEffect, useState } from "react";
import SearchString from "../../search/SearchString";
import SearchSelect from "../../search/SearchSelect";
import { provinceOptions } from "../../search/searchOptions";
import SearchSelect2 from "../../search/SearchSelect2";
import {
  DetailStudentStatus,
  Group,
  ModuleAll,
  CareerPathway,
  Profile,
} from "../../../model";
import { GreyButton } from "../../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import useInitialQuery from "../../../hooks/useInitialQuery";

interface Props {
  searchPage: string;
  groupData: Group[];
  careerPathwayData: CareerPathway[];
  moduleData: ModuleAll[];
  volunteerData: Profile[];
  trainingData: DetailStudentStatus[];
  nextStepData: DetailStudentStatus[];
  kaaryarAssessmentData: DetailStudentStatus[];
  referralToFinanceData: DetailStudentStatus[];
  isLoading: boolean;
}
const searchLink =
  "/moodle/search/param?pageNum=1&pageSize=10000&orderAscending=false&orderBy=regformGroup";
const SearchAllStudent = ({
  searchPage,
  groupData,
  careerPathwayData,
  moduleData,
  volunteerData,
  kaaryarAssessmentData,
  nextStepData,
  referralToFinanceData,
  trainingData,
  isLoading,
}: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { initialQuery, initialQueryMentorTa, initialQueryWithoutTransform } =
    useInitialQuery();

  const [disabledButton, setDisabledButton] = useState(false);
  const [outputFirstName, setOutputFirstName] = useState<string | null>(
    searchParams.get("firstName")
  );
  const [outputFamily, setOutputFamily] = useState<string | null>(
    searchParams.get("family")
  );
  const [referState, setReferState] = useState<string | null>(
    searchParams.get("refer")
  );
  const [mobileState, setMobileState] = useState<string | null>(
    searchParams.get("mobile")
  );
  const [emailState, setEmailState] = useState<string | null>(
    searchParams.get("email")
  );
  const [provincesState, setProvincesState] = useState<string | null>(
    searchParams.get("province")
  );
  const [cityState, setCityState] = useState<string | null>(
    searchParams.get("city")
  );
  // const [module, setModule] = useState<ModuleAll | null>(null);
  const groupIdParams = searchParams.get("groupID");
  const [group, setGroup] = useState<Group | null>(
    groupIdParams ? (initialQuery(groupData, groupIdParams) as any) : null
  );
  const careerPathwayIdParams = searchParams.get("careerPathwayId");
  const [careerPathway, setCareerPathway] = useState<CareerPathway | null>(
    careerPathwayIdParams
      ? (initialQuery(careerPathwayData, careerPathwayIdParams) as any)
      : null
  );
  const moduleAsStudentIDParams = searchParams.get("moduleAsStudentID");
  const [moduleAsStudent, setModuleAsStudent] = useState<ModuleAll | null>(
    moduleAsStudentIDParams
      ? (initialQuery(moduleData, moduleAsStudentIDParams) as any)
      : null
  );
  const currentAssignedTAIDParams = searchParams.get("currentAssignedTAID");
  const [ta, setTa] = useState<Profile | null>(
    currentAssignedTAIDParams
      ? (initialQueryMentorTa(volunteerData, currentAssignedTAIDParams) as any)
      : null
  );
  const currentAssignedMentorIDParams = searchParams.get(
    "currentAssignedMentorID"
  );
  const [mentor, setMentor] = useState<Profile | null>(
    currentAssignedMentorIDParams
      ? (initialQueryMentorTa(volunteerData, currentAssignedMentorIDParams) as any)
      : null
  );
  const trainingStatusIDParams = searchParams.get("trainingStatusID");
  const [trainingStatus, setTrainingStatus] =
    useState<DetailStudentStatus | null>(
      trainingStatusIDParams
        ? (initialQueryWithoutTransform(
            trainingData,
            trainingStatusIDParams
          ) as any)
        : null
    );
  const nextTrainingStepIDParams = searchParams.get("nextTrainingStepID");
  const [nextTrainingStep, setNextTrainingStep] =
    useState<DetailStudentStatus | null>(
      nextTrainingStepIDParams
        ? (initialQueryWithoutTransform(
            nextStepData,
            nextTrainingStepIDParams
          ) as any)
        : null
    );
  const referralToFinanceIDParams = searchParams.get("referralToFinanceID");
  const [referralToFinance, setReferralToFinance] =
    useState<DetailStudentStatus | null>(
      referralToFinanceIDParams
        ? (initialQueryWithoutTransform(
            referralToFinanceData,
            referralToFinanceIDParams
          ) as any)
        : null
    );
  const kaaryarAssessmentIDParams = searchParams.get("kaaryarAssessmentID");
  const [kaaryarAssessment, setKaaryarAssessment] =
    useState<DetailStudentStatus | null>(
      kaaryarAssessmentIDParams
        ? (initialQueryWithoutTransform(
            kaaryarAssessmentData,
            kaaryarAssessmentIDParams
          ) as any)
        : null
    );

  //disable search and clear buttons
  useEffect(() => {
    const buttonStatus = ![
      outputFirstName,
      outputFamily,
      referState,
      mobileState,
      emailState,
      provincesState,
      cityState,
      trainingStatus,
      nextTrainingStep,
      referralToFinance,
      kaaryarAssessment,
      // module,
      group,
      careerPathway,
      moduleAsStudent,
      ta,
      mentor,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    mentor,
    ta,
    moduleAsStudent,
    careerPathway,
    group,
    // module,
    kaaryarAssessment,
    referralToFinance,
    nextTrainingStep,
    trainingStatus,
    cityState,
    emailState,
    mobileState,
    outputFamily,
    outputFirstName,
    provincesState,
    referState,
  ]);

  const handleSearch = async () => {
    const obj = {
      firstName: outputFirstName?.trim(),
      family: outputFamily?.trim(),
      refer: referState,
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
      trainingStatusID: trainingStatus?.id,
      nextTrainingStepID: nextTrainingStep?.id,
      referralToFinanceID: referralToFinance?.id,
      kaaryarAssessmentID: kaaryarAssessment?.id,
      // moduleAsStudentID: module?.id,
      groupID: group?.id,
      careerPathwayId: careerPathway?.id,
      moduleAsStudentID: moduleAsStudent?.id,
      currentAssignedTAID: ta?.id,
      currentAssignedMentorID: mentor?.id,
    };

    const updateQueryParams = () => {
      const updatedQueryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(obj)) {
        if (value != null) {
          updatedQueryParams.append(key, String(value));
        }
      }
      setSearchParams(updatedQueryParams.toString());
    };
    console.log("search component");
    updateQueryParams();
  };

  const clearSearch = () => {
    setOutputFirstName(null);
    setOutputFamily(null);
    setReferState(null);
    setMobileState(null);
    setEmailState(null);
    setProvincesState(null);
    setCityState(null);
    setTrainingStatus(null);
    setNextTrainingStep(null);
    setReferralToFinance(null);
    setKaaryarAssessment(null);
    // setModule(null);
    setGroup(null);
    setCareerPathway(null);
    setModuleAsStudent(null);
    setTa(null);
    setMentor(null);
    setSearchParams("");
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <SearchFirstName
          outputFirstName={outputFirstName}
          setOutputFirstName={setOutputFirstName}
          searchPage={searchPage}
          searchLink={searchLink}
        />
      </Grid>
      <Grid item xs={3}>
        <SearchFamily
          outputFamily={outputFamily}
          setOutputFamily={setOutputFamily}
          searchPage={searchPage}
          searchLink={searchLink}
        />
      </Grid>
      <Grid item xs={3}>
        <SearchSelect
          state={provincesState}
          setState={setProvincesState}
          options={provinceOptions}
          placeholder="استان"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchString state={cityState} setState={setCityState} label="شهر" />
      </Grid>
      <Grid item xs={3}>
        <SearchString
          state={referState}
          setState={setReferState}
          label="نام معرف یا موسسه"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchString
          setState={setMobileState}
          state={mobileState}
          label="شماره همراه"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchString
          state={emailState}
          setState={setEmailState}
          label="ایمیل"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchSelect2
          state={group as any}
          setState={setGroup as any}
          options={groupData.map((i) => ({ id: i.id, value: i.name }))}
          placeholder="نام گروه"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchSelect2
          state={careerPathway as any}
          setState={setCareerPathway as any}
          options={careerPathwayData.map((i) => ({
            id: i.id,
            value: i.name,
          }))}
          placeholder="مسیر آموزشی"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchSelect2
          state={moduleAsStudent as any}
          setState={setModuleAsStudent as any}
          options={[
            { id: 0, value: "نامشخص" },
            ...moduleData.map((i) => ({
              id: i.id,
              value: i.name,
            })),
          ]}
          placeholder="دوره"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={ta as any}
          setState={setTa as any}
          options={[
            { id: 0, value: "نامشخص" },
            ...volunteerData.map((i) => ({
              id: i.userId,
              value: i.firstName + " " + i.lastName,
            })),
          ]}
          placeholder="مربی حل تمرین"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={mentor as any}
          setState={setMentor as any}
          options={[
            { id: 0, value: "نامشخص" },
            ...volunteerData.map((i) => ({
              id: i.userId,
              value: i.firstName + " " + i.lastName,
            })),
          ]}
          placeholder="منتور"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={trainingStatus}
          setState={setTrainingStatus}
          options={trainingData}
          placeholder="وضعیت آموزش"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={nextTrainingStep}
          setState={setNextTrainingStep}
          options={nextStepData}
          placeholder="قدم آتی آموزش"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={referralToFinance}
          setState={setReferralToFinance}
          options={referralToFinanceData}
          placeholder="ارجاع به واحد مالی"
        />
      </Grid>

      <Grid item xs={3}>
        <SearchSelect2
          state={kaaryarAssessment}
          setState={setKaaryarAssessment}
          options={kaaryarAssessmentData}
          placeholder="ارزیابی کاریار"
        />
      </Grid>

      {/* {moduleData && (
        <Grid item xs={3}>
          <SearchSelect2 //TODO: i have to change this to autoSelect (Transferred: 218.81 kB)- ask about this
            state={module as any}
            setState={setModule as any}
            options={moduleData.map((i) => ({ id: i.id, value: i.name }))}
            placeholder="نام دوره"
          />
        </Grid>
      )} */}

      <Grid item xs={3} sx={{ ml: "auto" }}>
        <GreyButton
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={clearSearch}
          disabled={disabledButton}
        >
          پاک کردن
        </GreyButton>
      </Grid>
      <Grid item flex={1}>
        <Button
          sx={{ width: "100%" }}
          endIcon={!isLoading && <SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleSearch}
          disabled={disabledButton || isLoading}
        >
          {isLoading ? "در حال جستجو..." : "جستجو"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAllStudent;
