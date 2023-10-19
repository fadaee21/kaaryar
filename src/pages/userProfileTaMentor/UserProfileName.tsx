import useSWR, { useSWRConfig } from "swr";
import UserProfileNameComp from "../../components/userProfile/UserProfileNameComp";
import { useAuth } from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { VolunteerProfile } from "../../model";
import { Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { editAxios } from "../../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
type ActiveObject = {
  value: boolean;
  label: string;
} | null;

const UserProfileName = () => {
  const [editMode, setEditMode] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [isActiveEditing, setIsActiveEditing] = useState<ActiveObject>(null);
  const {
    auth: { username },
  } = useAuth();
  const navigate = useNavigate();
  const MUTATE_URL = `/user/profile/username/${username}`;

  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR<VolunteerProfile>(
    `/user/profile/username/${username}`
  );

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setEditLoading(true);
      const res = await editAxios(`/user/profile`, {
        data: { profile: { isActive: isActiveEditing?.value } },
      });

      if (res.status === 200) {
        toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
        mutate(MUTATE_URL);
      }
      console.log(res);
    } catch (error) {
      toast.error(handleError(error as any));
    } finally {
      setEditLoading(false);
    }

    setEditMode((i: boolean) => !i);
  };

  if (error) {
    // toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <Container maxWidth="lg">
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start", mb: 6 }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h4">پروفایل کاربری</Typography>
          </Stack>
          {editMode ? (
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{ mr: 2, px: 7.25 }}
              disabled={editLoading}
            >
              ذخیره
            </Button>
          ) : (
            <Button
              endIcon={<EditIcon />}
              variant="outlined"
              onClick={() => setEditMode((i: boolean) => !i)}
              sx={{ mr: 2, px: 5 }}
            >
              ویرایش
            </Button>
          )}
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={editMode ? () => setEditMode(false) : () => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      {isLoading || editLoading ? (
        <LoadingProgress />
      ) : (
        data && (
          <UserProfileNameComp
            firstName={data?.firstName}
            lastName={data?.lastName}
            role={data?.role}
            isActive={data?.isActive}
            id={data?.id}
            editMode={editMode}
            setIsActiveEditing={setIsActiveEditing}
          />
        )
      )}
    </Container>
  );
};

export default UserProfileName;
