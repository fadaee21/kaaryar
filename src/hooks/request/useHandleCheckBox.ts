import React, { useCallback, useState } from "react";

export const useHandleCheckBox = () => {
  const [ids, setIds] = useState<number[]>([]);
  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      console.log(id);
      const isChecked = e.target.checked;
      setIds((old) => {
        if (isChecked) {
          return [...old, id];
        }
        return old.filter((item) => item !== id);
      });
    },
    []
  );

  return { ids, handleCheckBox, setIds };
};
