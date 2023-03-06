import React, { useCallback, useState } from "react";

export const useHandleCheckBox = () => {
  const [ids, setIds] = useState<string[]>([]);

  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      console.log(id);
      if (e.target.checked) {
        setIds((old) => [...old, id]);
      }
      if (!e.target.checked) {
        setIds((current) => {
          return current.filter((item) => item !== id);
        });
      }
    },
    []
  );

  return { ids, handleCheckBox,setIds };
};
