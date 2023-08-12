import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { SearchFirstName } from "./SearchFirstName";
import { SearchFamily } from "./SearchFamily";
import StatusSearch from "./StatusSearch";
import SearchSelect, { EditBooleanSearch } from "./SearchSelect";
import SearchString from "./SearchString";
import SearchIcon from "@mui/icons-material/Search";
import { GreyButton } from "../../styles/Button";
import useSWR from "swr";
import {
  acquaintanceOptions,
  eduLevelOptions,
  fieldOptions,
  finalResults,
  highSchoolOptions2,
  provinceOptions,
  scholarOptions,
  statusOptions,
} from "./searchOptions";
// import { EditComboStudent } from "../student/EditComboStudent";
// import TrainingStatusSearch from "./SearchSelect2";
import {
  DetailStudentStatus,
  Group,
  ModuleAll,
  OptionYesOrNo,
} from "../../model";
import SearchSelect2 from "./SearchSelect2";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { motivationOpt } from "../beforeWeek/helper";
// import { ApprovalStatus } from "../../model";
// import SearchScholar from "./SearchScholar";
// import SearchGender from "./SearchGender";

interface SearchAllType {
  setSearchingStudentBefore?: any;
  setSearchingStudentAfter?: any;
  setSearchingStudentRegister?: any;
  setSearchingMoodleStudent?: any;
  searchPage: string;
  chevronDir: boolean;
}

const SearchAll: ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  setSearchingMoodleStudent,
  searchPage,
  chevronDir,
}: SearchAllType) => JSX.Element = ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  setSearchingMoodleStudent,
  searchPage,
  chevronDir,
}) => {
  const [loading, setLoading] = useState(false);
  const [outputFirstName, setOutputFirstName] = useState<string | null>(null);
  const [outputFamily, setOutputFamily] = useState<string | null>(null);
  const [referState, setReferState] = useState<string | null>(null);
  const [highSchoolState, setHighSchoolState] = useState<string | null>(null);
  const [registerCodeState, setRegisterCodeState] = useState<string | null>(
    null
  );
  const [mobileState, setMobileState] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<string | null>(null);

  const [provincesState, setProvincesState] = useState<string | null>(null);
  const [cityState, setCityState] = useState<string | null>(null);
  //status of items: there is 3 phases for searching - "pending" - "approved" - "rejected" , these all is available only for search, if you render the table, response can be _acceptWeekChecked: true|false|null_ don't mess it up
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);
  const [acquaintance, setAcquaintance] = useState<string | null>(null);
  const [eduLevel, setEduLevel] = useState<string | null>(null);

  // const [gender, setGender] = useState<"مرد" | "زن" | null>(null);
  // const [studyField, setStudyField] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [scholar, setScholar] = useState<string | null>(null);
  const [finalField, setFinalField] = useState<string | null>(null);
  const [contCourseApproach, setContCourseApproach] = useState<string | null>(
    null
  );
  const [motivation, setMotivation] = useState<string | null>(null);
  const [jobStandby, setJobStandby] = useState<OptionYesOrNo | null>(null);
  const [cgpa, setCgpa] = useState<string | null>(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [searchLink, setSearchLink] = useState("");

  const [trainingStatus, setTrainingStatus] =
    useState<DetailStudentStatus | null>(null);
  const [nextTrainingStep, setNextTrainingStep] =
    useState<DetailStudentStatus | null>(null);
  const [referralToFinance, setReferralToFinance] =
    useState<DetailStudentStatus | null>(null);
  const [kaaryarAssessment, setKaaryarAssessment] =
    useState<DetailStudentStatus | null>(null);
  const [module, setModule] = useState<ModuleAll | null>(null);
  const [group, setGroup] = useState<Group | null>(null);

  const { data: trainingStatusData } = useSWR<DetailStudentStatus[]>(
    searchPage === "moodle" && chevronDir
      ? "/status/training-status/values/all"
      : null // get trainingData only for moodle search student
  );
  const { data: nextTrainingStepData } = useSWR<DetailStudentStatus[]>(
    searchPage === "moodle" && chevronDir
      ? "/status/next-training-step/values/all"
      : null
  );
  const { data: referralToFinanceData } = useSWR<DetailStudentStatus[]>(
    searchPage === "moodle" && chevronDir
      ? "/status/referral-finance/values/all"
      : null
  );
  const { data: KaaryarAssessmentData } = useSWR<DetailStudentStatus[]>(
    searchPage === "moodle" && chevronDir
      ? "/status/kaaryar-assessment/values/all"
      : null
  );
  const { data: ModuleData } = useSWR<ModuleAll[]>(
    searchPage === "moodle" && chevronDir
      ? "/modules/short-details/all?orderAscending=true&orderBy=name"
      : null
  );
  const { data: groupData } = useSWR<Group[]>(
    searchPage === "moodle" && chevronDir
      ? "/modules/categories/short-details/all?orderAscending=true&orderBy=name"
      : null
  );

  const beforeWeekSearch =
    "/exam/before/week/search/param?pageNum=1&pageSize=10000";
  const afterWeekSearch =
    "/exam/after/week/search/param?pageNum=1&pageSize=10000";
  const regSearch = "/reg/search/param?pageNum=1&pageSize=10000";
  const moodleSearch =
    "/moodle/search/param?pageNum=1&pageSize=10000&orderAscending=false&orderBy=regformGroup";
  // below function search in 4 pages at first find the api link for searching
  useEffect(() => {
    if (searchPage === "moodle") {
      setSearchLink(moodleSearch);
      return;
    }
    if (searchPage === "beforeWeek") {
      setSearchLink(beforeWeekSearch);
      return;
    }
    if (searchPage === "afterWeek") {
      setSearchLink(afterWeekSearch);
      return;
    }
    setSearchLink(regSearch);
  }, [searchPage]);

  //disable search and clear buttons
  useEffect(() => {
    const buttonStatus = ![
      outputFirstName,
      outputFamily,
      referState,
      highSchoolState,
      registerCodeState,
      mobileState,
      emailState,
      provincesState,
      cityState,
      approvalStatus,
      acquaintance,
      eduLevel,
      finalResult,
      scholar,
      finalField,
      contCourseApproach,
      jobStandby,
      cgpa,
      trainingStatus,
      nextTrainingStep,
      referralToFinance,
      kaaryarAssessment,
      module,
      group,
      motivation,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    motivation,
    group,
    module,
    kaaryarAssessment,
    referralToFinance,
    nextTrainingStep,
    trainingStatus,
    acquaintance,
    approvalStatus,
    cgpa,
    cityState,
    contCourseApproach,
    eduLevel,
    emailState,
    finalField,
    finalResult,
    highSchoolState,
    jobStandby,
    mobileState,
    outputFamily,
    outputFirstName,
    provincesState,
    referState,
    registerCodeState,
    scholar,
  ]);

  const fetchData = async (obj: any) => {
    setLoading(true);
    try {
      const response = await getData(searchLink, {
        params: obj,
      });
      if (response.status === 200) {
        //for each search you need specific setState
        searchPage === "moodle" && setSearchingMoodleStudent(response.data);
        searchPage === "beforeWeek" && setSearchingStudentBefore(response.data);
        searchPage === "afterWeek" && setSearchingStudentAfter(response.data);
        searchPage === "reg" && setSearchingStudentRegister(response.data);
      } else {
        console.log(response);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData({
      motivation,
      firstName: outputFirstName?.trim(),
      family: outputFamily?.trim(),
      refer: referState,
      highSchoolYear: highSchoolState,
      registrationCode: registerCodeState,
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
      education: eduLevel,
      familiarity: acquaintance,
      approvalStatus,
      // gender,
      // studyField,
      finalResult,
      scholarshipStatus: scholar,
      finalField,
      contCourseApproach,
      jobStandby: jobStandby?.value,
      cgpa,
      trainingStatusID: trainingStatus?.id,
      nextTrainingStepID: nextTrainingStep?.id,
      referralToFinanceID: referralToFinance?.id,
      kaaryarAssessmentID: kaaryarAssessment?.id,
      moduleID: module?.id,
      groupID: group?.id,
    });
  };

  const clearSearch = () => {
    setMotivation(null);
    setOutputFirstName(null);
    setOutputFamily(null);
    setReferState(null);
    setHighSchoolState(null);
    setAcquaintance(null);
    setEduLevel(null);
    setRegisterCodeState(null);
    setMobileState(null);
    setEmailState(null);
    setProvincesState(null);
    setCityState(null);
    setApprovalStatus(null);
    // setGender(null);
    // setStudyField(null);
    setFinalResult(null);
    setScholar(null);
    setFinalField(null);
    setContCourseApproach(null);
    setJobStandby(null);
    setCgpa(null);
    setTrainingStatus(null);
    setNextTrainingStep(null);
    setReferralToFinance(null);
    setKaaryarAssessment(null);
    setModule(null);
    setGroup(null);
    // searchPage !== "moodle" && setApprovalStatus(null);
    searchPage === "moodle" && setSearchingMoodleStudent(null);
    searchPage === "beforeWeek" && setSearchingStudentBefore(null);
    searchPage === "afterWeek" && setSearchingStudentAfter(null);
    searchPage === "reg" && setSearchingStudentRegister(null);
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
      {["reg", "moodle"].includes(searchPage) && (
        <Grid item xs={3}>
          <SearchString
            state={referState}
            setState={setReferState}
            label="نام معرف یا موسسه"
          />
        </Grid>
      )}
      {searchPage === "reg" && (
        <Grid item xs={3}>
          <SearchSelect
            state={highSchoolState}
            setState={setHighSchoolState}
            options={highSchoolOptions2}
            placeholder="سال دبیرستان"
          />
        </Grid>
      )}
      {searchPage === "reg" && (
        <Grid item xs={3}>
          <SearchSelect
            state={eduLevel}
            setState={setEduLevel}
            options={eduLevelOptions}
            placeholder="میزان تحصیلات"
          />
        </Grid>
      )}
      {searchPage === "reg" && (
        <Grid item xs={3}>
          <SearchSelect
            state={acquaintance}
            setState={setAcquaintance}
            options={acquaintanceOptions}
            placeholder="نحوه آشنایی"
          />
        </Grid>
      )}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <SearchString
            state={registerCodeState}
            setState={setRegisterCodeState}
            label="کد متقاضی"
          />
        </Grid>
      )}
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

      {searchPage !== "moodle" && (
        <>
          <Grid item xs={3}>
            <StatusSearch
              setState={setApprovalStatus}
              state={approvalStatus}
              statusOptions={statusOptions}
              placeholder="وضعیت"
            />
          </Grid>
          {/* {searchPage !== "reg" && (
            <Grid item xs={3}>
              <SearchString
                state={studyField}
                setState={setStudyField}
                label="رشته تحصیلی"
              />
            </Grid>
          )} */}
        </>
      )}
      {searchPage === "beforeWeek" && (
        <>
          <Grid item xs={3}>
            <SearchString
              state={contCourseApproach}
              setState={setContCourseApproach}
              label="نمره آزمون"
            />
          </Grid>
          <Grid item xs={3}>
            <EditBooleanSearch
              // identifier={"jobStandby"}
              handleChange={(e: any) => setJobStandby(e)}
              placeholder="آمادگی به کار"
              value={jobStandby}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect
              state={motivation}
              setState={setMotivation}
              placeholder="انگیزه ورود"
              options={motivationOpt}
            />
          </Grid>
        </>
      )}
      {searchPage === "afterWeek" && (
        <>
          <Grid item xs={3}>
            <SearchSelect
              state={finalResult}
              setState={setFinalResult}
              options={finalResults}
              placeholder="نتیجه نهایی"
            />
          </Grid>
          <Grid item xs={3}>
            <StatusSearch
              state={scholar}
              setState={setScholar}
              placeholder="وضعیت بورسیه"
              statusOptions={scholarOptions}
            />
          </Grid>
          <Grid item xs={3}>
            <StatusSearch
              state={finalField}
              setState={setFinalField}
              placeholder="رشته نهایی"
              statusOptions={fieldOptions}
            />
          </Grid>
        </>
      )}

      {searchPage === "moodle" && (
        <>
          {trainingStatusData && (
            <Grid item xs={3}>
              <SearchSelect2
                state={trainingStatus}
                setState={setTrainingStatus}
                options={trainingStatusData}
                placeholder="وضعیت آموزش"
              />
            </Grid>
          )}
          {nextTrainingStepData && (
            <Grid item xs={3}>
              <SearchSelect2
                state={nextTrainingStep}
                setState={setNextTrainingStep}
                options={nextTrainingStepData}
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
          {KaaryarAssessmentData && (
            <Grid item xs={3}>
              <SearchSelect2
                state={kaaryarAssessment}
                setState={setKaaryarAssessment}
                options={KaaryarAssessmentData}
                placeholder="ارزیابی کاریار"
              />
            </Grid>
          )}
          {ModuleData && (
            <Grid item xs={3}>
              <SearchSelect2
                state={module as any}
                setState={setModule as any}
                options={ModuleData.map((i) => ({ id: i.id, value: i.name }))}
                placeholder="نام دوره"
              />
            </Grid>
          )}
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
        </>
      )}

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

export default SearchAll;
