import { useSearchParams } from "react-router-dom";
import useInitialQuery from "../../hooks/useInitialQuery";
import { CareerPathway, Group, OptionYesOrNo } from "../../model";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import SearchFirstName from "./SearchFirstName";
import SearchFamily from "./SearchFamily";
import SearchString from "./SearchString";
import SearchSelect, { EditBooleanSearch } from "./SearchSelect";
import {
  acquaintanceOptions,
  fieldOptions,
  provinceOptions,
  scholarOptions,
  statusSeekerOptions,
} from "./searchOptions";
import { GreyButton } from "../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import StatusSearch from "./StatusSearch";
import { presentStatusOpt, workshopContOpt } from "../afterWeek/helper";
import SearchSelect2 from "./SearchSelect2";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  loading: boolean;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  groupData?: Group[];
  careerPathwayData?: CareerPathway[];
  searchPage: "skillSeeker";
}

const searchLink = "/status/form/all";

const SearchSeeker = ({
  loading,
  setSearchMode,
  groupData,
  searchPage,
  careerPathwayData,
}: Props) => {
  const { initialQuery } = useInitialQuery();
  let [searchParams, setSearchParams] = useSearchParams();
  const [disabledButton, setDisabledButton] = useState(false);

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
  const acquaintanceParams = searchParams.get("familiarity");
  const acquaintanceOption = acquaintanceOptions.find(
    (i) => i.value === acquaintanceParams
  );
  const [acquaintance, setAcquaintance] = useState<string | null>(
    acquaintanceParams && acquaintanceOption ? acquaintanceOption.value : null
  );
  //--
  const workshopContParams = searchParams.get("familiarity");
  const workshopContOption = workshopContOpt.find(
    (i) => i.value === workshopContParams
  );
  const [workshopCont, setWorkshopCont] = useState<string | null>(
    workshopContParams && workshopContOption ? workshopContOption.value : null
  );
  //--
  const presentStatusParams = searchParams.get("presentStatus");
  const presentStatusOption = presentStatusOpt.find(
    (i) => i.value === presentStatusParams
  );
  const [presentStatus, setPresentStatus] = useState<string | null>(
    presentStatusParams && presentStatusOption
      ? presentStatusOption.value
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
  const finalFieldParams = searchParams.get("finalField");
  const finalFieldOption = fieldOptions.find(
    (i) => i.value === finalFieldParams
  );
  const [finalField, setFinalField] = useState<string | null>(
    finalFieldParams && finalFieldOption ? finalFieldOption.value : null
  );
  //--
  const hasLMSUserCondition = searchParams.get("hasLMSUser");
  const hasLMSUserParams =
    hasLMSUserCondition === null
      ? null
      : {
          value: hasLMSUserCondition === "true",
          label:
            hasLMSUserCondition === "true"
              ? ("بله" as "بله")
              : ("خیر" as "خیر"),
        };
  const [hasLMSUser, setHasLMSUser] = useState<OptionYesOrNo | null>(
    hasLMSUserParams
  );
  //--
  const scholarParams = searchParams.get("scholarshipStatus");
  const scholarOption = scholarOptions.find((i) => i.value === scholarParams);
  const [scholar, setScholar] = useState<string | null>(
    scholarParams && scholarOption ? scholarOption.value : null
  );
  //--
  const afterweekCareerPathwayIdParams = searchParams.get(
    "afterweekCareerPathwayId"
  );
  const [afterweekCareerPathwayId, setAfterweekCareerPathwayId] =
    useState<CareerPathway | null>(
      afterweekCareerPathwayIdParams
        ? (initialQuery(
            careerPathwayData,
            afterweekCareerPathwayIdParams
          ) as any)
        : null
    );
  //--
  const registrationCareerPathwayIdParams = searchParams.get(
    "registrationCareerPathwayId"
  );
  const [registrationCareerPathwayId, setRegistrationCareerPathwayId] =
    useState<CareerPathway | null>(
      registrationCareerPathwayIdParams
        ? (initialQuery(
            careerPathwayData,
            registrationCareerPathwayIdParams
          ) as any)
        : null
    );
  //--
  const groupIdParams = searchParams.get("groupID");
  const [group, setGroup] = useState<Group | null>(
    groupIdParams ? (initialQuery(groupData, groupIdParams) as any) : null
  );
  //--
  const allActionsFromParam = searchParams.get("allActionsFrom");
  const allActionsToParam = searchParams.get("allActionsTo");
  const allActionsFromDate = allActionsFromParam
    ? new Date(allActionsFromParam)
    : null;
  const allActionsToDate = allActionsToParam
    ? new Date(allActionsToParam)
    : null;
  const [allActionsFrom, setAllActionsFrom] = useState<Date | Dayjs | null>(
    allActionsFromDate
  );
  const [allActionsTo, setAllActionsTo] = useState<Date | Dayjs | null>(
    allActionsToDate
  );
  //--
  const approvalStatusParams = searchParams.get("latestAction");
  const statusOption = statusSeekerOptions.find(
    (i) => i.value === approvalStatusParams
  );
  const [approvalStatus, setApprovalStatus] = useState<string | null>(
    approvalStatusParams && statusOption ? statusOption.value : null
  );

  //disable search and clear buttons
  useEffect(() => {
    const buttonStatus = ![
      allActionsTo,
      allActionsFrom,
      presentStatus,
      outputFirstName,
      outputFamily,
      referState,
      registerCodeState,
      mobileState,
      emailState,
      provincesState,
      cityState,
      acquaintance,
      workshopCont,
      scholar,
      finalField,
      hasLMSUser,
      group,
      afterweekCareerPathwayId,
      registrationCareerPathwayId,
      approvalStatus,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    presentStatus,
    workshopCont,
    acquaintance,
    cityState,
    emailState,
    finalField,
    hasLMSUser,
    mobileState,
    outputFamily,
    outputFirstName,
    provincesState,
    referState,
    registerCodeState,
    scholar,
    afterweekCareerPathwayId,
    registrationCareerPathwayId,
    group,
    allActionsTo,
    allActionsFrom,
    approvalStatus,
  ]);

  const handleSearch = () => {
    const obj = {
      firstName: outputFirstName?.trim(),
      family: outputFamily?.trim(),
      refer: referState,
      workshopCont,
      registrationCode: registerCodeState,
      city: cityState,
      province: provincesState,
      mobile: mobileState,
      email: emailState,
      presentStatus,
      familiarity: acquaintance,
      latestAction:approvalStatus,
      scholarshipStatus: scholar,
      finalField,
      hasLMSUser: hasLMSUser?.value,
      afterweekCareerPathwayId: afterweekCareerPathwayId?.id,
      registrationCareerPathwayId: registrationCareerPathwayId?.id,
      groupId: group?.id,
      allActionsTo: allActionsTo?.toISOString(),
      allActionsFrom:
        allActionsFrom && dayjs(allActionsFrom).startOf("day").toISOString(),
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
    setAllActionsFrom(null);
    setAllActionsTo(null);
    setOutputFirstName(null);
    setOutputFamily(null);
    setReferState(null);
    setAcquaintance(null);
    setRegisterCodeState(null);
    setMobileState(null);
    setEmailState(null);
    setPresentStatus(null);
    setScholar(null);
    setFinalField(null);
    setHasLMSUser(null);
    setWorkshopCont(null);
    setGroup(null);
    setSearchParams("");
    setCityState(null);
    setProvincesState(null);
    setSearchMode(false);
    setAfterweekCareerPathwayId(null);
    setRegistrationCareerPathwayId(null);
    setApprovalStatus(null);
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
          statusOptions={statusSeekerOptions}
          placeholder="وضعیت"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchString
          state={referState}
          setState={setReferState}
          label="نام معرف یا موسسه"
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
      <Grid item xs={3}>
        <SearchSelect
          state={workshopCont}
          setState={setWorkshopCont}
          options={workshopContOpt}
          placeholder="شرکت در کارگاه معارفه"
        />
      </Grid>
      <Grid item xs={3}>
        <SearchSelect
          state={presentStatus}
          setState={setPresentStatus}
          options={presentStatusOpt}
          placeholder="حضور غیاب هفته پذیرش"
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

      <Grid item xs={3}>
        <EditBooleanSearch
          handleChange={(e: any) => setHasLMSUser(e)}
          placeholder="اکانت ال ام اس"
          value={hasLMSUser}
          options={[
            { value: true, label: "دارد" },
            { value: false, label: "ندارد" },
          ]}
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
        <>
          <Grid item xs={3}>
            <SearchSelect2
              state={afterweekCareerPathwayId as any}
              setState={setAfterweekCareerPathwayId as any}
              options={careerPathwayData.map((i) => ({
                id: i.id,
                value: i.name,
              }))}
              placeholder="مسیر آموزشی"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect2
              state={registrationCareerPathwayId as any}
              setState={setRegistrationCareerPathwayId as any}
              options={careerPathwayData.map((i) => ({
                id: i.id,
                value: i.name,
              }))}
              placeholder="رشته انتخابی"
            />
          </Grid>
        </>
      )}
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setAllActionsFrom}
          sessionDate={allActionsFrom}
          label="از (تاریخ تأیید/رد)"
          usageType="searching"
        />
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setAllActionsTo}
          sessionDate={allActionsTo}
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

export default SearchSeeker;
