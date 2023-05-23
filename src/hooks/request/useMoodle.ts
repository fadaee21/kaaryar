import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";

const useMoodle = (linkApi: string, page?: number) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      try {
        let response = await getData(linkApi);
        let data = await response.data;
        setStudents(data);
        setLoading(false);
      } catch (error) {
        //TODO:handle Error
        console.log("catch block of error");
        console.log(error);
        setLoading(false);
        navigate("/");
      }
    };

    getList();
    window.scrollTo(0, 0);
  }, [linkApi, navigate, page]);

  return { students, loading };
};

export default useMoodle;
