import { Button, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import SearchFirstName from "./SearchFirstName";
import SearchFamily from "./SearchFamily";
import StatusSearch from "./StatusSearch";
import SearchSelect, { EditBooleanSearch } from "./SearchSelect";
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

import { Group, OptionYesOrNo } from "../../model";
import SearchSelect2 from "./SearchSelect2";
import { motivationOpt } from "../beforeWeek/helper";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { RelatedPath } from "../addNewCourseComp/CareerPathway";
import { useSearchParams } from "react-router-dom";
import useInitialQuery from "../../hooks/useInitialQuery";

interface SearchAllType {
  searchPage: "beforeWeek" | "afterWeek" | "reg";
  loading: boolean;
  groupData?: Group[];
  selectedFieldOpt?: RelatedPath[] | undefined;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const beforeWeekSearch =
  "/exam/before/week/search/param?pageNum=1&pageSize=10000";
const afterWeekSearch =
  "/exam/after/week/search/param?pageNum=1&pageSize=10000";
const regSearch = "/reg/search/param?pageNum=1&pageSize=10000";

const SearchAll: ({
  searchPage,
  groupData,
  loading,
  selectedFieldOpt,
  setSearchMode,
}: SearchAllType) => JSX.Element = ({
  searchPage,
  groupData,
  loading,
  selectedFieldOpt,
  setSearchMode,
}) => {
  const { initialQuery } = useInitialQuery();
  let [searchParams, setSearchParams] = useSearchParams();
  const [disabledButton, setDisabledButton] = useState(false);
  const [searchLink, setSearchLink] = useState("");

  //--
  const [outputFirstName, setOutputFirstName] = useState<string | null>(
    searchParams.get("firstName")
  );
  //--
  const [outputFamily, setOutputFamily] = useState<string | null>(
    searchParams.get("family")
  );
  //--
  const [referState, setReferState] = useState<string | null>(
    searchParams.get("refer")
  );
  //--
  const highSchoolStateParams = searchParams.get("highSchoolYear");
  const highSchoolStateOption = highSchoolOptions2.find(
    (i) => i.value === highSchoolStateParams
  );
  const [highSchoolState, setHighSchoolState] = useState<string | null>(
    highSchoolStateParams && highSchoolStateOption
      ? highSchoolStateOption.value
      : null
  );
  //--
  const [registerCodeState, setRegisterCodeState] = useState<string | null>(
    searchParams.get("registrationCode")
  );
  //--
  const [mobileState, setMobileState] = useState<string | null>(
    searchParams.get("mobile")
  );
  //--
  const [emailState, setEmailState] = useState<string | null>(
    searchParams.get("email")
  );
  //--
  const [provincesState, setProvincesState] = useState<string | null>(
    searchParams.get("province")
  );
  //--
  const [cityState, setCityState] = useState<string | null>(
    searchParams.get("city")
  );
  //--
  //status of items: there is 3 phases for searching - "pending" - "approved" - "rejected" , these all is available only for search, if you render the table, response can be _acceptWeekChecked: true|false|null_ don't mess it up
  const approvalStatusParams = searchParams.get("approvalStatus");
  const statusOption = statusOptions.find(
    (i) => i.value === approvalStatusParams
  );
  const [approvalStatus, setApprovalStatus] = useState<string | null>(
    approvalStatusParams && statusOption ? statusOption.value : null
  );
  //--
  const acquaintanceParams = searchParams.get("familiarity");
  const acquaintanceOption = acquaintanceOptions.find(
    (i) => i.value === acquaintanceParams
  );

  const [acquaintance, setAcquaintance] = useState<string | null>(
    acquaintanceParams && acquaintanceOption ? acquaintanceOption.value : null
  );
  //--
  const eduLevelParams = searchParams.get("education");
  const eduLevelOption = eduLevelOptions.find(
    (i) => i.value === eduLevelParams
  );
  const [eduLevel, setEduLevel] = useState<string | null>(
    eduLevelParams && eduLevelOption ? eduLevelOption.value : null
  );
  //----
  const finalResultParams = searchParams.get("finalResult");
  const finalResultOption = finalResults.find(
    (i) => i.value === finalResultParams
  );
  const [finalResult, setFinalResult] = useState<string | null>(
    finalResultParams && finalResultOption ? finalResultOption.value : null
  );
  //--
  const scholarParams = searchParams.get("scholarshipStatus");
  const scholarOption = scholarOptions.find((i) => i.value === scholarParams);
  const [scholar, setScholar] = useState<string | null>(
    scholarParams && scholarOption ? scholarOption.value : null
  );
  //--
  const finalFieldParams = searchParams.get("finalField");
  const finalFieldOption = fieldOptions.find(
    (i) => i.value === finalFieldParams
  );
  const [finalField, setFinalField] = useState<string | null>(
    finalFieldParams && finalFieldOption ? finalFieldOption.value : null
  );

  //--
  const [contCourseApproach, setContCourseApproach] = useState<string | null>(
    searchParams.get("contCourseApproach")
  );
  //--
  const motivationParams = searchParams.get("motivation");
  const motivationOption = motivationOpt.find(
    (i) => i.value === motivationParams
  );
  const [motivation, setMotivation] = useState<string | null>(
    motivationParams && motivationOption ? motivationOption.value : null
  );
  //--
  const jobStandbyCondition = searchParams.get("jobStandby");
  const jobStandbyParams =
    jobStandbyCondition === null
      ? null
      : {
          value: jobStandbyCondition === "true",
          label:
            jobStandbyCondition === "true"
              ? ("بله" as "بله")
              : ("خیر" as "خیر"),
        };
  const [jobStandby, setJobStandby] = useState<OptionYesOrNo | null>(
    jobStandbyParams
  );
  //--
  // const [cgpa, setCgpa] = useState<string | null>(null);
  //--
  const groupIdParams = searchParams.get("groupID");
  const [group, setGroup] = useState<Group | null>(
    groupIdParams ? (initialQuery(groupData, groupIdParams) as any) : null
  );
  //--
  const createdAtToParam = searchParams.get("createdAtTo");
  const createdAtFromParam = searchParams.get("createdAtFrom");
  const createdAtToDate = createdAtToParam ? new Date(createdAtToParam) : null;
  const createdAtFromDate = createdAtFromParam
    ? new Date(createdAtFromParam)
    : null;
  const [createdAtFrom, setCreatedAtFrom] = useState<Date | Dayjs | null>(
    createdAtFromDate
  );
  const [createdAtTo, setCreatedAtTo] = useState<Date | Dayjs | null>(
    createdAtToDate
  );
  const decidedAtFromParam = searchParams.get("decidedAtFrom");
  const decidedAtToParam = searchParams.get("decidedAtTo");
  const decidedAtFromDate = decidedAtFromParam
    ? new Date(decidedAtFromParam)
    : null;
  const decidedAtToDate = decidedAtToParam ? new Date(decidedAtToParam) : null;
  const [decidedAtFrom, setDecidedAtFrom] = useState<Date | Dayjs | null>(
    decidedAtFromDate
  );
  const [decidedAtTo, setDecidedAtTo] = useState<Date | Dayjs | null>(
    decidedAtToDate
  );
  //--
  const careerPathwayIdParams = searchParams.get("careerPathwayId");
  const [careerPathwayId, setCareerPathwayId] = useState<any>(
    careerPathwayIdParams
      ? (initialQuery(selectedFieldOpt, careerPathwayIdParams) as any)
      : null
  );
  //--

  // below function search in 3 pages at first find the api link for searching
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

  const handleSearch = () => {
    const obj = {
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
      // cgpa,
      groupID: group?.id,
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
    updateQueryParams();
    setSearchMode(true);
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
    // setCgpa(null);
    setGroup(null);
    setCareerPathwayId(null);
    setSearchParams("");
    setSearchMode(false);
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
      {searchPage !== "afterWeek" && (
        <>
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
        </>
      )}
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
          label="تا (تاریخ تأیید/رد)"
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
