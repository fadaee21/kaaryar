import useSWR from "swr";
import LoadingProgress from "../../LoadingProgress";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";
import { Navigate } from "react-router-dom";
import VolunteerEditComp from "./VolunteerEditComp";
import { useRef } from "react";
import { getData } from "../../../api/axios";
const url = "/user/profile";
interface Props{
  setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
const VolunteerEditParent = ({setEditingProfile}:Props) => {
  const random = useRef(Date.now());
  const { data, isLoading, error } = useSWR(
    [url, random],
    async (url: string[]) => {
      try {
        const response = await getData(url[0].toString());
        return response.data;
      } catch (error) {
        toast.error(handleError(error as any));
        throw error;
      }
    }
  );

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    return (
      <>
        {toast.error(handleError(error))}
        <Navigate to="/" replace />
      </>
    );
  }
  return <VolunteerEditComp profileData={data} setEditingProfile={setEditingProfile} />;
};

export default VolunteerEditParent;
