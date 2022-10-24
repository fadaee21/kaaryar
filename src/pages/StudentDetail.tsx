import React from "react";
import { useParams } from "react-router-dom";

const StudentDetail = () => {

  const {id} =useParams()

  console.log(id)

  return <>
  <div>StudentDetail</div>
  <h1>{id}</h1>
  </>;
};

export default StudentDetail;
