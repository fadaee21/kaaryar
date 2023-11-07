import React, { useEffect, useState } from "react";
import { SearchField } from "../../styles/search/searchField";
import { Button, Grid } from "@mui/material";
import { GreyButton } from "../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/AuthProvider";
import { Comment, DetailStudentStatus, ShortCoreModule } from "../../model";
import SearchSelect2 from "../../components/search/SearchSelect2";
import useSWR from "swr";

import { JalaliDatePicker } from "../../components/comment/JalaliDatePicker";
import { Dayjs } from "dayjs";

interface Props {
  setSearchResult: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  setLiftUpSearchState: React.Dispatch<
    React.SetStateAction<{
      student: string;
      commenterUser: string;
      commenterRole: DetailStudentStatus | null;
      sessionDateFrom: Date | Dayjs | null;
      sessionDateTo: Date | Dayjs | null;
      moduleName: DetailStudentStatus | null;
    }>
  >;
  setSearchingComments: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchAllComments = ({
  setSearchResult,
  setLiftUpSearchState,
  setSearchingComments,
}: Props) => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [commenterUser, setCommenterUser] = useState("");
  const [moduleName, setModuleName] = useState<DetailStudentStatus | null>(
    null
  );
  const [sessionDateFrom, setSessionDateFrom] = useState<Date | Dayjs | null>(
    null
  );
  const [sessionDateTo, setSessionDateTo] = useState<Date | Dayjs | null>(null);
  const [student, setStudent] = useState("");
  const [commenterRole, setCommenterRole] =
    useState<DetailStudentStatus | null>(null);

  const { adminVisibility } = useAuth();
  const MODULES_ALL_CORE = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=start_date`;
  const { data: allModule } = useSWR<ShortCoreModule[]>(MODULES_ALL_CORE);

  useEffect(() => {
    setLiftUpSearchState({
      student,
      commenterUser,
      commenterRole,
      sessionDateFrom,
      sessionDateTo,
      moduleName,
    });
    const buttonStatus = ![
      commenterUser,
      student,
      commenterRole,
      moduleName,
      sessionDateFrom,
      sessionDateTo,
      moduleName,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    commenterUser,
    setLiftUpSearchState,
    student,
    commenterRole,
    moduleName,
    sessionDateFrom,
    sessionDateTo,
  ]);
  const clearSearch = () => {
    setSearchResult(null);
    setCommenterUser("");
    setStudent("");
    setCommenterRole(null);
    setSessionDateFrom(null);
    setSessionDateTo(null);
    setModuleName(null);
  };

  return (
    <Grid container spacing={2}>
      {adminVisibility && (
        <Grid item xs={3}>
          <SearchString
            label="نام و نام خانوادگی نظر دهنده"
            setState={setCommenterUser}
            state={commenterUser}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        <SearchString
          label="نام و نام خانوادگی مهارت آموز"
          setState={setStudent}
          state={student}
        />
      </Grid>
      {adminVisibility && (
        <Grid item xs={3}>
          <SearchSelect2
            options={[
              { value: "منتور", id: "mentor" },
              { value: "مربی حل تمرین", id: "ta" },
            ]}
            placeholder="نقش نظر دهنده"
            setState={setCommenterRole}
            state={commenterRole}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        {allModule && (
          <SearchSelect2
            state={moduleName as any}
            setState={setModuleName as any}
            options={allModule.map((i) => ({
              id: i.id,
              value: i.name,
            }))}
            placeholder="دوره آموزشی"
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setSessionDateFrom}
          sessionDate={sessionDateFrom}
          label="از (تاریخ جلسه)"
          usageType="searching"
        />
      </Grid>
      <Grid item xs={3}>
        <JalaliDatePicker
          setSessionDate={setSessionDateTo}
          sessionDate={sessionDateTo}
          label="تا (تاریخ جلسه)"
          usageType="searching"
        />
      </Grid>

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
          endIcon={<SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={() => setSearchingComments(true)}
          disabled={disabledButton}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAllComments;

interface SearchType {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  label: string;
}
const SearchString = ({ setState, state, label }: SearchType) => {
  return (
    <SearchField
      fullWidth
      value={state || ""}
      id={`outlined-${label.substring(0, 2)}`}
      label={label}
      variant="outlined"
      onChange={(e) => setState(e.target.value)}
      type="search"
    />
  );
};
