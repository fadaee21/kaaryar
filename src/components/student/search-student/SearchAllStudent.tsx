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
import useGetStatusStudent from "../../../hooks/request/useGetStatusStudent";
import useSWR from "swr";
import { GreyButton } from "../../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import { getData } from "../../../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";

interface Props {
  setSearchingMoodleStudent: React.Dispatch<React.SetStateAction<any[] | null>>;
  searchPage: string;
  chevronDir: boolean;
}
const searchLink =
  "/moodle/search/param?pageNum=1&pageSize=10000&orderAscending=false&orderBy=regformGroup";
const SearchAllStudent = ({
  chevronDir,
  searchPage,
  setSearchingMoodleStudent,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [outputFirstName, setOutputFirstName] = useState<string | null>(null);
  const [outputFamily, setOutputFamily] = useState<string | null>(null);
  const [referState, setReferState] = useState<string | null>(null);
  const [mobileState, setMobileState] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<string | null>(null);
  const [provincesState, setProvincesState] = useState<string | null>(null);
  const [cityState, setCityState] = useState<string | null>(null);
  // const [module, setModule] = useState<ModuleAll | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [careerPathway, setCareerPathway] = useState<CareerPathway | null>(
    null
  );
  const [currentModule, setCurrentModule] = useState<ModuleAll | null>(null);
  const [ta, setTa] = useState<Profile | null>(null);
  const [mentor, setMentor] = useState<Profile | null>(null);
  const [trainingStatus, setTrainingStatus] =
    useState<DetailStudentStatus | null>(null);
  const [nextTrainingStep, setNextTrainingStep] =
    useState<DetailStudentStatus | null>(null);
  const [referralToFinance, setReferralToFinance] =
    useState<DetailStudentStatus | null>(null);
  const [kaaryarAssessment, setKaaryarAssessment] =
    useState<DetailStudentStatus | null>(null);

  const {
    trainingData,
    nextStepData,
    referralToFinanceData,
    kaaryarAssessmentData,
  } = useGetStatusStudent(chevronDir);
  const orderingOpt =
    "orderAscending=true&orderBy=name&pageNum=1&pageSize=10000";
  const { data: ModuleData } = useSWR<ModuleAll[]>(
    chevronDir ? `/modules/short-details/all?${orderingOpt}` : null
  );
  const { data: groupData } = useSWR<Group[]>(
    chevronDir ? `/modules/categories/short-details/all?${orderingOpt}` : null
  );
  const { data: careerPathwayData } = useSWR<CareerPathway[]>(
    chevronDir ? `/modules/career-pathways/all?${orderingOpt}` : null
  );

  const { data: volunteerData } = useSWR<Profile[]>("/user/profile/all");

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
      currentModule,
      ta,
      mentor,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    mentor,
    ta,
    currentModule,
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
    setLoading(true);
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
      currentModuleID: currentModule?.id,
      currentAssignedTAID: ta?.id,
      currentAssignedMentorID: mentor?.id,
    };
    try {
      const response = await getData(searchLink, { params: obj });
      setSearchingMoodleStudent(response.status === 200 ? response.data : null);
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
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
    setCurrentModule(null);
    setTa(null);
    setMentor(null);
    searchPage === "moodle" && setSearchingMoodleStudent(null);
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
      {groupData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={group as any}
            setState={setGroup as any}
            options={groupData.map((i) => ({ id: i.id, value: i.name }))}
            placeholder="نام گروه"
          />
        </Grid>
      )}
      {careerPathwayData && (
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
      )}
      {ModuleData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={currentModule as any}
            setState={setCurrentModule as any}
            options={[
              { id: 0, value: "نامشخص" },
              ...ModuleData.map((i) => ({
                id: i.id,
                value: i.name,
              })),
            ]}
            placeholder="دوره کنونی"
          />
        </Grid>
      )}
      {volunteerData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={ta as any}
            setState={setTa as any}
            options={[
              { id: 0, value: "نامشخص" },
              ...volunteerData.map((i) => ({
                id: i.id,
                value: i.firstName + " " + i.lastName,
              })),
            ]}
            placeholder="مربی حل تمرین"
          />
        </Grid>
      )}
      {volunteerData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={mentor as any}
            setState={setMentor as any}
            options={[
              { id: 0, value: "نامشخص" },
              ...volunteerData.map((i) => ({
                id: i.id,
                value: i.firstName + " " + i.lastName,
              })),
            ]}
            placeholder="منتور"
          />
        </Grid>
      )}
      {trainingData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={trainingStatus}
            setState={setTrainingStatus}
            options={trainingData}
            placeholder="وضعیت آموزش"
          />
        </Grid>
      )}
      {nextStepData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={nextTrainingStep}
            setState={setNextTrainingStep}
            options={nextStepData}
            placeholder="قدم آتی آموزش"
          />
        </Grid>
      )}
      {referralToFinanceData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={referralToFinance}
            setState={setReferralToFinance}
            options={referralToFinanceData}
            placeholder="ارجاع به واحد مالی"
          />
        </Grid>
      )}
      {kaaryarAssessmentData && (
        <Grid item xs={3}>
          <SearchSelect2
            state={kaaryarAssessment}
            setState={setKaaryarAssessment}
            options={kaaryarAssessmentData}
            placeholder="ارزیابی کاریار"
          />
        </Grid>
      )}

      {/* {ModuleData && (
        <Grid item xs={3}>
          <SearchSelect2 //TODO: i have to change this to autoSelect (Transferred: 218.81 kB)- ask about this
            state={module as any}
            setState={setModule as any}
            options={ModuleData.map((i) => ({ id: i.id, value: i.name }))}
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
          endIcon={!loading && <SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleSearch}
          disabled={disabledButton || loading}
        >
          {loading ? "در حال جستجو..." : "جستجو"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAllStudent;
