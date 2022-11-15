import React from "react";
import { getData } from "../../api/axios";

const useCountPagination = (counting: string) => {
  const [counterPage, setCounterPage] = React.useState<string>("");

  React.useEffect(() => {
    const getCountComment = async () => {
      try {
        let { data } = await getData(counting);
        setCounterPage(data.message);
      } catch (error) {
        console.log("Page Counter", error);
      }
    };
    getCountComment();
  }, []);
  return [counterPage];
};

export default useCountPagination;
