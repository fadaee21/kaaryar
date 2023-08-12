import React, { useCallback, useState } from "react";

export const useHandleCheckBox = () => {
  const [ids, setIds] = useState<number[]>([]);

  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
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

  return { ids, handleCheckBox, setIds };
};
