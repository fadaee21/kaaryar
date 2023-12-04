import { Button, Grid } from "@mui/material";
import { OptionActive, Profile } from "../../model";
// import SearchSelect2 from "../search/SearchSelect2";
import useSWR from "swr";
import { useEffect, useState } from "react";
// import LoadingProgress from "../LoadingProgress";
import SearchSelect, { EditBooleanSearch } from "../search/SearchSelect";
import { GreyButton } from "../../styles/Button";
import SearchIcon from "@mui/icons-material/Search";
import { getData } from "../../api/axios";
import { handleError } from "../../utils/handleError";
import { toast } from "react-toastify";
const ALL_PROFILE_VOLUNTEER = "/user/profile/all";
interface Props {
  setSearchingVolunteer: React.Dispatch<React.SetStateAction<Profile[] | null>>;
  chevronDir: boolean;
}
const SEARCH_VOLUNTEER =
  "/user/profile/search/param?pageNum=1&pageSize=100&orderAscending=false&orderBy=id";
const SearchVolunteer = ({ chevronDir, setSearchingVolunteer }: Props) => {
  const { data: allProfileData } = useSWR<Profile[]>(
    chevronDir ? ALL_PROFILE_VOLUNTEER : null
  );
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<OptionActive | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const obj = {
      firstName,
      lastName,
      role,
      isActive: isActive?.value,
    };
    console.log(obj);
    try {
      const response = await getData(SEARCH_VOLUNTEER, {
        params: obj,
      });

      if (response.status === 200) {
        setSearchingVolunteer(response.data);
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

  const clearSearch = () => {
    setFirstName(null);
    setLastName(null);
    setRole(null);
    setIsActive(null);
    setSearchingVolunteer(null);
  };

  useEffect(() => {
    const buttonStatus = ![firstName, lastName, role, isActive].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [firstName, isActive, lastName, role]);

  return (
    <Grid container spacing={2}>
      {allProfileData && (
        <>
          <Grid item xs={3}>
            <SearchSelect
              state={firstName}
              setState={setFirstName}
              options={Array.from(
                new Set(allProfileData.map((i) => i.firstName.trim()))
              ).map((firstName) => ({
                label: firstName,
                value: firstName,
              }))}
              placeholder="نام"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect
              state={lastName}
              setState={setLastName}
              options={Array.from(
                new Set(allProfileData.map((i) => i.lastName.trim()))
              ).map((lastName) => ({
                label: lastName,
                value: lastName,
              }))}
              placeholder="نام خانوادگی"
            />
          </Grid>
          <Grid item xs={3}>
            <SearchSelect
              state={role}
              setState={setRole}
              options={[
                { value: "ta", label: "حل تمرین" },
                { value: "mentor", label: "منتور" },
              ]}
              placeholder="نقش"
            />
          </Grid>
          <Grid item xs={3}>
            <EditBooleanSearch
              handleChange={(e: any) => setIsActive(e)}
              value={isActive}
              placeholder="وضعیت"
              options={[
                { value: true, label: "فعال" },
                { value: false, label: "غیرفعال" },
              ]}
            />
          </Grid>
        </>
      )}
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

export default SearchVolunteer;
