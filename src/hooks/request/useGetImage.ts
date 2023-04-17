import React from "react";
import { getData } from "../../api/axios";

const useGetImage = (address: string) => {
  const [pic, setPic] = React.useState<string | undefined>();
  const getPicture = async (pictureURL: string) => {
    try {
      let response = await getData(`${address}/${pictureURL}`, {
        responseType: "arraybuffer", //so important!!
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPic(url);
    } catch (error) {
      console.log(error);
    }
  };

  return { pic, getPicture };
};

export default useGetImage;
