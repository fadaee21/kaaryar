import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import CodeMelli from "./CodeMelli";
import Mobile from "./Mobile";
import SearchProvinces from "./Provinces";
import SearchEmail from "./SearchEmail";
import SearchGender from "./SearchGender";
import { SearchFamily } from "./SearchFamily";
import StatusSearch from "./StatusSearch";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFirstName } from "./SearchFirstName";
import SearchCity from "./SearchCity";

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
  const [allState, setAllState] = useState<object | null>(null);
  const [outputFirstName, setOutputFirstName] = useState<string | null>(null);
  const [outputFamily, setOutputFamily] = useState<string | null>(null);
  const [outputGender, setOutputGender] = useState<string | null>(null);
  const [codeMelliState, setCodeMelliState] = useState<string | null>(null);
  const [mobileState, setMobileState] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<string | null>(null);
  const [provincesState, setProvincesState] = useState<string | null>(null);
  const [cityState, setCityState] = useState<string | null>(null);
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

  useEffect(() => {
    setAllState({
      firstName: outputFirstName,
      family: outputFamily,
      gender: outputGender,
      codeMeli: codeMelliState,
      status: statusState,
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
    });
  }, [
    outputFirstName,
    outputFamily,
    outputGender,
    codeMelliState,
    mobileState,
    emailState,
    provincesState,
    statusState,
    cityState,
  ]);

  //if AccordionDetails was close, do nothing(fetching data and mounting component)
  if (!chevronDir) {
    return <></>;
  }

  const fetchData = async () => {
    try {
      const response = await getData(searchLink(), {
        params: allState,
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

  const handleClick = () => {
    console.log(allState);
    fetchData();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <SearchFirstName
          setOutputFirstName={setOutputFirstName}
          searchPage={searchPage}
          searchLink={searchLink()}
        />
      </Grid>
      <Grid item xs={3}>
        <SearchFamily
          setOutputFamily={setOutputFamily}
          searchPage={searchPage}
          searchLink={searchLink()}
        />
      </Grid>
      {/* some field not use in moodle search at the moment */}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <CodeMelli setCodeMelliState={setCodeMelliState} />
        </Grid>
      )}
      <Grid item xs={3}>
        <Mobile setMobileState={setMobileState} />
      </Grid>
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <SearchGender setOutputGender={setOutputGender} />
        </Grid>
      )}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <SearchProvinces setProvincesState={setProvincesState} />
        </Grid>
      )}
      {searchPage === "moodle" && (
        <Grid item xs={3}>
          <SearchCity setCityState={setCityState} />
        </Grid>
      )}
      {searchPage !== "moodle" && (
        <Grid item xs={3}>
          <StatusSearch setStatusState={setStatusState} />
        </Grid>
      )}
      <Grid item xs={3}>
        <SearchEmail setEmailState={setEmailState} />
      </Grid>
      <Grid item xs={3} sx={{ ml: "auto" }}>
        <Button
          sx={{ width: "100%" }}
          endIcon={<SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleClick}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAll;
