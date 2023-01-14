import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import CodeMelli from "./CodeMelli";
import Mobile from "./Mobile";
import SearchProvinces from "./Provinces";
import SearchEmail from "./SearchEmail";
import SearchGender from "./SearchGender";
import { SearchName } from "./SearchName";
import StatusSearch from "./StatusSearch";
import SearchIcon from "@mui/icons-material/Search";

const SearchAll = ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  searchPage,
}: any) => {
  const [allState, setAllState] = useState<object | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const [outputGender, setOutputGender] = useState<string | null>(null);
  const [codeMelliState, setCodeMelliState] = useState<string | null>(null);
  const [mobileState, setMobileState] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<string | null>(null);
  const [provincesState, setProvincesState] = useState<string | null>(null);
  const [statusState, setStatusState] = useState<boolean | null>(null);

  const beforeWeekSearch = "/exam/before/week/search/param";
  const afterWeekSearch = "/exam/after/week/search/param";
  const regSearch = "/reg/search/param";
  const searchLink = () => {
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
      family: outputName,
      gender: outputGender,
      codeMeli: codeMelliState,
      status: statusState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
    });
  }, [
    outputName,
    outputGender,
    codeMelliState,
    mobileState,
    emailState,
    provincesState,
    statusState,
  ]);

  const fetchData = async () => {
    try {
      const response = await getData(searchLink(), {
        params: allState,
      });
      if (response.status === 200) {
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
        <SearchName
          setOutputName={setOutputName}
          searchPage={searchPage}
          searchLink={searchLink()}
        />
      </Grid>
      <Grid item xs={3}>
        <CodeMelli setCodeMelliState={setCodeMelliState} />
      </Grid>
      <Grid item xs={3}>
        <Mobile setMobileState={setMobileState} />
      </Grid>
      <Grid item xs={3}>
        <SearchEmail setEmailState={setEmailState} />
      </Grid>
      <Grid item xs={3}>
        <SearchGender setOutputGender={setOutputGender} />
      </Grid>
      <Grid item xs={3}>
        <SearchProvinces setProvincesState={setProvincesState} />
      </Grid>
      <Grid item xs={3}>
        <StatusSearch setStatusState={setStatusState} />
      </Grid>
      <Grid item xs={3}>
        <Button
          sx={{ width: "100%",minHeight:"55px" }}
          endIcon={<SearchIcon />}
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
