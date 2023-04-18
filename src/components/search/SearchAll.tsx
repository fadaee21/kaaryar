import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { getData } from "../../api/axios";
import { SearchFirstName } from "./SearchFirstName";
import { SearchFamily } from "./SearchFamily";
import StatusSearch from "./StatusSearch";
import SearchSelect from "./SearchSelect";
import SearchString from "./SearchString";
import SearchIcon from "@mui/icons-material/Search";
import { GreyButton } from "../../styles/Button";
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
import { ApprovalStatus } from "../../model";
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
  const [jobStandby, setJobStandby] = useState<string | null>(null);
  const [cgpa, setCgpa] = useState<string | null>(null);

  const beforeWeekSearch = "/exam/before/week/search/param";
  const afterWeekSearch = "/exam/after/week/search/param";
  const regSearch = "/reg/search/param";
  const moodleSearch = "/moodle/search/param";
  // below function search in 4 pages at first find the api link for searching
  const searchLink = () => {
    if (searchPage === "moodle") {
      return moodleSearch;
    }
    if (searchPage === "beforeWeek") {
      return beforeWeekSearch;
    }
    if (searchPage === "afterWeek") {
      return afterWeekSearch;
    }
    return regSearch;
  };

  //if AccordionDetails is close, do nothing(fetching data and mounting component)
  if (!chevronDir) {
    return <></>;
  }

  const fetchData = async (obj: any) => {
    try {
      const response = await getData(searchLink(), {
        params: obj,
      });
      console.log(response);
      if (response.status === 200) {
        //for each search you need specific setState
        searchPage === "moodle" && setSearchingMoodleStudent(response.data);
        searchPage === "beforeWeek" && setSearchingStudentBefore(response.data);
        searchPage === "afterWeek" && setSearchingStudentAfter(response.data);
        searchPage === "reg" && setSearchingStudentRegister(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchData({
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
      jobStandby,
      cgpa,
    });
  };

  const clearSearch = () => {
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
          searchLink={searchLink()}
        />
      </Grid>
      <Grid item xs={3}>
        <SearchFamily
          outputFamily={outputFamily}
          setOutputFamily={setOutputFamily}
          searchPage={searchPage}
          searchLink={searchLink()}
        />
      </Grid>
      {searchPage === "reg" && (
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
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <SearchSelect
            state={provincesState}
            setState={setProvincesState}
            options={provinceOptions}
            placeholder="استان"
          />
        </Grid>
      )}

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
            <SearchString
              state={jobStandby}
              setState={setJobStandby}
              label="آمادگی به کار"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchString
              state={contCourseApproach}
              setState={setContCourseApproach}
              label="هدف از شرکت"
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

      <Grid item xs={3} sx={{ ml: "auto" }}>
        <GreyButton
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={clearSearch}
        >
          پاک کردن
        </GreyButton>
      </Grid>
      <Grid item flex={1}>
        <Button
          sx={{ width: "100%" }}
          endIcon={<SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleSearch}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAll;
