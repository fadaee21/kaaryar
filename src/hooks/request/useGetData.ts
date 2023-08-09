import { useCallback, useState } from "react";
import { getData } from "../../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

const useGetData = () => {
  const [dataCall, setDataCall] = useState<any>();
  const [loadingCall, setLoadingCall] = useState(true);

  const getAllData = useCallback(async (address: string) => {
    try {
      setLoadingCall(true);
      const response = await getData(address);
      const result = await response.data;
      setDataCall(result);
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoadingCall(false);
    }
  }, []);

  return { getAllData, dataCall, loadingCall };
};

export default useGetData;
