import React from "react";
import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";

const EditComments11 = () => {
  const { allComment, loading } = useGetOneComment();
  if (loading) {
    return <LoadingProgress />;
  }
console.log(allComment)
  return <div>EditComments11</div>;
};

export default EditComments11;
