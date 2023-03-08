import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { getData } from "../../api/axios";
// import CodeMelli from "./CodeMelli";
// import SearchGender from "./SearchGender";
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
  highSchoolOptions2,
  provinceOptions,
} from "./searchOptions";
interface SearchAllType {
  setSearchingStudentBefore?: any;
  setSearchingStudentAfter?: any;
  setSearchingStudentRegister?: any;
  setSearchingMoodleStudent?: any;
  searchPage: string;
  chevronDir: boolean;
  stateWaiting?: any;
  setStateWaiting?: any;
  statusState?: any;
  setStatusState?: any;
}

const SearchAll: ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  setSearchingMoodleStudent,
  searchPage,
  chevronDir,
  stateWaiting,
  setStateWaiting,
  statusState,
  setStatusState,
}: SearchAllType) => JSX.Element = ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  setSearchingMoodleStudent,
  searchPage,
  chevronDir,
  stateWaiting,
  setStateWaiting,
  statusState,
  setStatusState,
}) => {
  const [outputFirstName, setOutputFirstName] = useState<string | null>(null);
  const [outputFamily, setOutputFamily] = useState<string | null>(null);
  const [referState, setReferState] = useState<string | null>(null);
  const [highSchoolState, setHighSchoolState] = useState<string | null>(null);
  const [registerCodeState, setRegisterCodeState] = useState<string | null>(
    null
  );
  const [mobileState, setMobileState] = useState<string | null>("");
  const [emailState, setEmailState] = useState<string | null>("");
  const [provincesState, setProvincesState] = useState<string | null>(null);
  const [cityState, setCityState] = useState<string | null>("");
  // const [codeMelliState, setCodeMelliState] = useState<string>("");
  // const [outputGender, setOutputGender] = useState<string>("");
  // const [stateWaiting, setStateWaiting] = useState<boolean | null>(null); //this state is for handling statusState===null
  // const [statusState, setStatusState] = useState<boolean | null>(null);
  const [acquaintance, setAcquaintance] = useState<string | null>(null);
  const [eduLevel, setEduLevel] = useState<string | null>(null);
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
      status: statusState,
      state: stateWaiting, //add state for handling status===null
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
      education: eduLevel,
      familiarity: acquaintance,
      // gender: outputGender,
      // codeMeli: codeMelliState,
    });
  };

  const clearSearch = () => {
    setOutputFirstName(null);
    setOutputFamily(null);
    setReferState(null);
    setHighSchoolState(null);
    setAcquaintance(null);
    setEduLevel("");
    setRegisterCodeState(null);
    setMobileState("");
    setEmailState("");
    setProvincesState("");
    setCityState("");
    searchPage !== "moodle" && setStateWaiting(null);
    searchPage !== "moodle" && setStatusState(null);
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
      {searchPage === "reg" && ( //some field just use in registration search
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
      {searchPage !== "moodle" && ( //some field not use in moodle search at the moment
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
          label="شماره موبایل"
        />
      </Grid>
      {/* {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <SearchGender
            outputGender={outputGender}
            setOutputGender={setOutputGender}
          />
        </Grid>
      )} */}
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
      {searchPage === "moodle" && (
        <Grid item xs={3}>
          <SearchString state={cityState} setState={setCityState} label="شهر" />
        </Grid>
      )}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <StatusSearch
            statusState={statusState}
            setStatusState={setStatusState}
            stateWaiting={stateWaiting}
            setStateWaiting={setStateWaiting}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        <SearchString
          state={emailState}
          setState={setEmailState}
          label="ایمیل"
        />
      </Grid>
      {/* <Grid item xs={12}></Grid> */}
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
