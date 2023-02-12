import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { getData } from "../../api/axios";
// import CodeMelli from "./CodeMelli";
import Mobile from "./Mobile";
import SearchProvinces from "./Provinces";
import SearchEmail from "./SearchEmail";
// import SearchGender from "./SearchGender";
import { SearchFamily } from "./SearchFamily";
import StatusSearch from "./StatusSearch";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFirstName } from "./SearchFirstName";
import SearchCity from "./SearchCity";
import { GreyButton } from "../../styles/Button";
import Refer from "./Refer";
import HighSchool from "./highSchool";
import Registration from "./Registration";

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
  // const [allState, setAllState] = useState<object | null>(null);
  const [outputFirstName, setOutputFirstName] = useState<string | null>(null);
  const [outputFamily, setOutputFamily] = useState<string | null>(null);
  // const [outputGender, setOutputGender] = useState<string>("");
  // const [codeMelliState, setCodeMelliState] = useState<string>("");
  const [referState, setReferState] = useState<string | null>(null);
  const [highSchoolState, setHighSchoolState] = useState<string | null>(null);
  const [registerCodeState, setRegisterCodeState] = useState<string | null>(
    null
  );
  const [mobileState, setMobileState] = useState<string>("");
  const [emailState, setEmailState] = useState<string>("");
  const [provincesState, setProvincesState] = useState<string>("");
  const [cityState, setCityState] = useState<string>("");
  //this state is for handling statusState===null
  const [stateWaiting, setStateWaiting] = useState<boolean | null>(null);
  const [statusState, setStatusState] = useState<boolean | null>(null);

  const beforeWeekSearch = "/exam/before/week/search/param";
  const afterWeekSearch = "/exam/after/week/search/param";
  const regSearch = "/reg/search/param";
  const moodleSearch = "/moodle/search/param";
  // this component search for 4 pages
  //at first find the api link for searching
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
      firstName: outputFirstName,
      family: outputFamily,
      // gender: outputGender,
      // codeMeli: codeMelliState,
      status: statusState,
      refer: referState,
      highSchoolYear: highSchoolState,
      registrationCode: registerCodeState,
      //add state for handling status===null
      state: stateWaiting,
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
    });
  };

  const clearSearch = () => {
    fetchData({
      firstName: "",
      family: "",
      // gender: "",
      // codeMeli:""
      refer: null,
      highSchoolYear: null,
      registerCodeState: null,
      status: null,
      city: "",
      province: "",
      mobile: "",
      email: "",
    });
    setStatusState(null);
    setStateWaiting(null);
    setOutputFirstName(null);
    setOutputFamily(null);
    // setOutputGender("");
    setReferState(null);
    setHighSchoolState(null);
    setMobileState("");
    setEmailState("");
    setProvincesState("");
    setCityState("");
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
      {/* some field not use in moodle search at the moment */}
      {searchPage === "reg" && (
        <Grid item xs={3}>
          <Refer refer={referState} setRefer={setReferState} />
        </Grid>
      )}
      {searchPage === "reg" && (
        <Grid item xs={3}>
          <HighSchool
            highSchool={highSchoolState}
            setHighSchool={setHighSchoolState}
          />
        </Grid>
      )}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <Registration
            registerCode={registerCodeState}
            setRegisterCode={setRegisterCodeState}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        <Mobile setMobileState={setMobileState} mobileState={mobileState} />
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
          <SearchProvinces
            provincesState={provincesState}
            setProvincesState={setProvincesState}
          />
        </Grid>
      )}
      {searchPage === "moodle" && (
        <Grid item xs={3}>
          <SearchCity cityState={cityState} setCityState={setCityState} />
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
        <SearchEmail emailState={emailState} setEmailState={setEmailState} />
      </Grid>
      {/* {searchPage !== "reg" && (<Grid item xs={12}></Grid>)} */}
      <Grid item xs={12}></Grid>
      <Grid item xs={3} sx={{ ml: "auto" }}>
        <GreyButton
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={clearSearch}
        >
          پاک کردن
        </GreyButton>
      </Grid>
      <Grid item xs={6}>
        <Button
          sx={{ width: "100%" }}
          endIcon={<SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleSearch}
          // disabled={
          //   outputFirstName ||
          //   outputFamily ||
          //   outputGender ||
          //   referState ||
          //   statusState ||
          //   cityState ||
          //   provincesState ||
          //   mobileState ||
          //   emailState
          // }
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAll;
