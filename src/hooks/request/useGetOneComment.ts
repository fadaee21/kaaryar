import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { Comment } from "../../model";

const useGetOneComment = () => {
  const [allComment, setAllComment] = useState<Comment | null>(null); //all data in the this comment
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const navigate = useNavigate();
  const { id } = useParams();

  const linkGetOne =
    roles === "admin" ? `total/survey/${id}` : `${roles}/survey/${id}`;


  useEffect(() => {
    const oneComment = async () => {
      setLoading(true);
      try {
        const commentLink = linkGetOne;
        let response = await getData(commentLink);
        let data = await response.data;
        setAllComment(data);
        setLoading(false);
      } catch (error) {
        //TODO:handle Error
        console.log("catch block of error");
        console.log(error);
        navigate("/");
        setLoading(false);
      }
    };
    oneComment()
    window.scroll(0, 0);
  }, [linkGetOne, navigate]);

  return { allComment, loading };
};

export default useGetOneComment;
