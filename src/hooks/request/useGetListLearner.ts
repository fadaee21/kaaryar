import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
// import { AfterWeekType, BeforeWeekType } from "../../model";

const useGetListLearner = (
  linkApi: string,
  loadingMulti: boolean,
  page: number
) => {
  const [students, setStudents] = useState<
    // AfterWeekType[] | BeforeWeekType[]
    any[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getListLearner = useCallback(async () => {
    setLoading(true);
    try {
      let response = await getData(linkApi);
      setStudents(response.data);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [page, linkApi, loadingMulti]);

  return { loading, getListLearner, students };
};

export default useGetListLearner;
