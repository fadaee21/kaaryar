import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../api/axios";
import { Course, StudentId } from "../../model";

interface Comment {
  course: Course | null;
  studentId: StudentId | null;
  comment: string;
  sessionDate: string;
  sessionProblem: string;
  studentTask: string;
  studentContribute: string;
  //it should be string or boolean?? ask alireza
  studentPresent: boolean | string;
}

const useGetOneComment = () => {
  const [allComment, setAllComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { roleQuery, id } = useParams();

  const getListComments = async () => {
    setLoading(true);
    try {
      const allCommentLink = `${roleQuery}/survey/${id}`;
      let response = await getData(allCommentLink);
      setAllComment(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
      setLoading(false);
    }
  };
  useEffect(() => {
    getListComments();
    window.scroll(0, 0);
  }, []);

  return { allComment, loading };
};

export default useGetOneComment;
