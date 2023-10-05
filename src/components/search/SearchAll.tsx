import { Button, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { getData } from "../../api/axios";
import SearchFirstName from "./SearchFirstName";
import SearchFamily from "./SearchFamily";
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

import { Group, OptionYesOrNo } from "../../model";
import SearchSelect2 from "./SearchSelect2";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { motivationOpt } from "../beforeWeek/helper";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { RELATED_PATH, RelatedPath } from "../addNewCourseComp/CareerPathway";

interface SearchAllType {
  setSearchingStudentBefore?: any;
  setSearchingStudentAfter?: any;
  setSearchingStudentRegister?: any;
  searchPage: "beforeWeek" | "afterWeek" | "reg";
  chevronDir: boolean;
}
interface ObjTypeSearch {
  createdAtTo: string | undefined;
  createdAtFrom: string | null;
  decidedAtTo: string | undefined;
  decidedAtFrom: string | null;
  motivation: string | null;
  firstName: string | undefined;
  family: string | undefined;
  refer: string | null;
  highSchoolYear: string | null;
  registrationCode: string | null;
  city: string | null;
  province: string | null;
  mobile: string | null;
  email: string | null;
  education: string | null;
  familiarity: string | null;
  approvalStatus: string | null;
  finalResult: string | null;
  scholarshipStatus: string | null;
  finalField: string | null;
  contCourseApproach: string | null;
  jobStandby: boolean | undefined;
  cgpa: string | null;
  groupID: number | undefined;
  careerPathwayId: number | undefined;
}

const beforeWeekSearch =
  "/exam/before/week/search/param?pageNum=1&pageSize=10000";
const afterWeekSearch =
  "/exam/after/week/search/param?pageNum=1&pageSize=10000";
const regSearch = "/reg/search/param?pageNum=1&pageSize=10000";

const SearchAll: ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
  searchPage,
  chevronDir,
}: SearchAllType) => JSX.Element = ({
  setSearchingStudentBefore,
  setSearchingStudentAfter,
  setSearchingStudentRegister,
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
  const [group, setGroup] = useState<Group | null>(null);
  const [createdAtFrom, setCreatedAtFrom] = useState<Date | Dayjs | null>(null);
  const [createdAtTo, setCreatedAtTo] = useState<Date | Dayjs | null>(null);
  const [decidedAtFrom, setDecidedAtFrom] = useState<Date | Dayjs | null>(null);
  const [decidedAtTo, setDecidedAtTo] = useState<Date | Dayjs | null>(null);
  const [careerPathwayId, setCareerPathwayId] = useState<any>(null);
  const { data: groupData } = useSWR<Group[]>(
    chevronDir
      ? "/modules/categories/short-details/all?orderAscending=true&orderBy=name"
      : null
  );
  const { data: selectedFieldOpt } = useSWR<RelatedPath[]>(RELATED_PATH);

  // below function search in 4 pages at first find the api link for searching
  useEffect(() => {
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
      createdAtTo,
      createdAtFrom,
      decidedAtTo,
      decidedAtFrom,
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
      group,
      motivation,
      careerPathwayId,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    careerPathwayId,
    motivation,
    group,
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
    createdAtTo,
    createdAtFrom,
    decidedAtTo,
    decidedAtFrom,
  ]);

  const fetchData = async (obj: ObjTypeSearch) => {
    setLoading(true);
    try {
      const response = await getData(searchLink, {
        params: obj,
      });

      if (response.status === 200) {
        const searchPageActions = {
          beforeWeek: setSearchingStudentBefore,
          afterWeek: setSearchingStudentAfter,
          reg: setSearchingStudentRegister,
        };
        const action = searchPageActions[searchPage];
        if (action) {
          action(response.data);
        }
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
      createdAtTo: createdAtTo?.toISOString(),
      createdAtFrom:
        createdAtFrom && dayjs(createdAtFrom).startOf("day").toISOString(),
      decidedAtTo: decidedAtTo?.toISOString(),
      decidedAtFrom:
        decidedAtFrom && dayjs(decidedAtFrom).startOf("day").toISOString(),
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
      finalResult,
      scholarshipStatus: scholar,
      finalField,
      contCourseApproach,
      jobStandby: jobStandby?.value,
      careerPathwayId: careerPathwayId?.id,
      cgpa,
      groupID: group?.id,
    });
  };

  const clearSearch = () => {
    setCreatedAtFrom(null);
    setCreatedAtTo(null);
    setDecidedAtFrom(null);
    setDecidedAtTo(null);
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
    setFinalResult(null);
    setScholar(null);
    setFinalField(null);
    setContCourseApproach(null);
    setJobStandby(null);
    setCgpa(null);
    setGroup(null);
    setCareerPathwayId(null);
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
      <Grid item xs={3}>
        <SearchString
          state={registerCodeState}
          setState={setRegisterCodeState}
          label="کد متقاضی"
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
        <StatusSearch
          setState={setApprovalStatus}
          state={approvalStatus}
          statusOptions={statusOptions}
          placeholder="وضعیت"
        />
      </Grid>
      {searchPage === "reg" && (
        <>
          <Grid item xs={3}>
            <SearchString
              state={referState}
              setState={setReferState}
              label="نام معرف یا موسسه"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect
              state={eduLevel}
              setState={setEduLevel}
              options={eduLevelOptions}
              placeholder="میزان تحصیلات"
            />
          </Grid>
          {selectedFieldOpt && (
            <Grid item xs={3}>
              <SearchSelect2
                state={careerPathwayId}
                setState={setCareerPathwayId}
                options={selectedFieldOpt.map((item) => ({
                  id: item.id,
                  value: item.name,
                }))}
                placeholder="رشته انتخابی"
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <SearchSelect
              state={highSchoolState}
              setState={setHighSchoolState}
              options={highSchoolOptions2}
              placeholder="سال دبیرستان"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect
              state={acquaintance}
              setState={setAcquaintance}
              options={acquaintanceOptions}
              placeholder="نحوه آشنایی"
            />
          </Grid>
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
              options={[
                { value: true, label: "بله" },
                { value: false, label: "خیر" },
              ]}
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
      <>
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
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setCreatedAtFrom}
          sessionDate={createdAtFrom}
          label="از (تاریخ ارسال فرم)"
          usageType="searching"
        />
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setCreatedAtTo}
          sessionDate={createdAtTo}
          label="تا (تاریخ ارسال فرم)"
          usageType="searching"
        />
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setDecidedAtFrom}
          sessionDate={decidedAtFrom}
          label="از (تاریخ تأیید/رد)"
          usageType="searching"
        />
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setDecidedAtTo}
          sessionDate={decidedAtTo}
          label="تا (تاریخ ارسال فرم)"
          usageType="searching"
        />
      </Grid>

      {/* //buttons */}
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

export default memo(SearchAll);
