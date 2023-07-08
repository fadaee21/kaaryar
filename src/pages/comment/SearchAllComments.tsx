import React, { useEffect, useState } from "react";
import { SearchField } from "../../styles/search/searchField";
import { Button, Grid } from "@mui/material";
import { GreyButton } from "../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/AuthProvider";
import { Comment } from "../../model";

interface Props {
  setSearchResult: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  setLiftUpSearchState: React.Dispatch<
    React.SetStateAction<{
      student: string;
      commenterUser: string;
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
  const [student, setStudent] = useState("");

  const { adminVisibility } = useAuth();

  useEffect(() => {
    setLiftUpSearchState({ student, commenterUser });
    const buttonStatus = ![commenterUser, student].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [commenterUser, setLiftUpSearchState, student]);
  const clearSearch = () => {
    setSearchResult(null);
    setCommenterUser("");
    setStudent("");
  };

  return (
    <Grid container spacing={2}>
      {adminVisibility && (
        <Grid item xs={4}>
          <SearchString
            label="نام و نام خانوادگی نظر دهنده"
            setState={setCommenterUser}
            state={commenterUser}
          />
        </Grid>
      )}
      <Grid item xs={4}>
        <SearchString
          label="نام و نام خانوادگی مهارت آموز"
          setState={setStudent}
          state={student}
        />
      </Grid>
      <Grid item xs={4} sx={{ ml: "auto" }}>
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
