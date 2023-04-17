import React from "react";
import { getData } from "../../api/axios";

const useCountPagination = (counting: string) => {
  const [counterPage, setCounterPage] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const getCountComment = async () => {
      setLoading(true);
      try {
        let { data } = await getData(counting);
        setCounterPage(data.count);
        setLoading(false);
      } catch (error) {
        console.log("Page Counter", error);
        setLoading(false);
      }
    };
    getCountComment();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, []);
  return [loading, counterPage];
};

export default useCountPagination;
