import { toast } from "react-toastify";
import useSWR from "swr";
import { handleError } from "../../utils/handleError";

const useCountPagination = (counting: string) => {
  const { data: counterPage, isLoading: loading } = useSWR(counting, {
    onSuccess: () => window.scrollTo(0, 0),
    onError: (error) => toast.error(handleError(error)),
  });

  return [loading, counterPage?.count];
};

export default useCountPagination;
