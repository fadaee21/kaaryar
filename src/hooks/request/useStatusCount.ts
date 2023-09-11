import useSWR from "swr";
import { ApprovalStatus } from "../../model";
import { handleError } from "../../utils/handleError";
import { toast } from "react-toastify";

const useStatusCount = (apiLink: string, status: ApprovalStatus) => {
  const {
    data: statusNum,
    error,
    isLoading: loadingStatus,
  } = useSWR(`${apiLink}?status=${status}`);
  if (error) toast.error(handleError(error));
  return [loadingStatus, statusNum?.count];
};

export default useStatusCount;
