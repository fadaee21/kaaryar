import React from "react";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

interface Picture {
  address: string;
}

const useGetImage = (picture: Picture) => {
  const { auth } = useAuth();
  const [pic, setPic] = React.useState<string | null>(null);

  const getPicture = async () => {
    try {
      let response = await getData(picture.address, {
        responseType: "arraybuffer", //so important!!
        headers: {
          Authorization: auth!.token,
        },
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
