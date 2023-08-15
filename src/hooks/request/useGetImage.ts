import { useCallback, useEffect, useState } from "react";
import { getData } from "../../api/axios";

const useGetImage = (address: string) => {
  const [pic, setPic] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const getPicture = useCallback(
    async (pictureURL: string) => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await getData(`${address}/${pictureURL}`, {
          responseType: "arraybuffer",
        });

        const url = URL.createObjectURL(new Blob([response.data]));
        setPic(url);
      } catch (error) {
        setError("Error fetching image.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [address]
  );

  useEffect(() => {
    return () => {
      // Cleanup function to revoke object URL when component unmounts
      if (pic) {
        URL.revokeObjectURL(pic);
      }
    };
  }, [pic]);

  return { pic, error, loading, getPicture };
};

export default useGetImage;
