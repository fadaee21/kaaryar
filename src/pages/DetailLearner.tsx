import React from "react";
import { useParams } from "react-router-dom";

const DetailLearner = () => {

  const {id} =useParams()

  console.log(id)

  return <div>DetailLearner</div>;
};

export default DetailLearner;
