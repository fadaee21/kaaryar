import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AsyncSelect from "react-select/async";
import { getData } from "../api/axios";
import { BeforeWeekType } from "../model";


const JustTest = () => {
  const [selectedValue, setSelectedValue] = useState<BeforeWeekType | null>(
    null
  );
  const [inputValue, setValue] = useState("");

  const fetchData = async (inputValue: string) => {
    try {
      const response = await getData("/exam/search", {
        params: {
          keyword: inputValue,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const promiseOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchData(inputValue));
      }, 1500);
    });

  return (
    <>
      <AsyncSelect
        value={inputValue}
        defaultOptions
        getOptionLabel={(e: any) =>
          e.registrationForm.firstName + " " + e.registrationForm.family
        }
        getOptionValue={(e: any) =>
          e.registrationForm.firstName + e.registrationForm.family
        }
        onInputChange={(e) => {
          setValue(e);
          console.log("inputValue");
        }}
        onChange={(e: any) => setSelectedValue(e)}
        cacheOptions
        loadOptions={promiseOptions}
        placeholder="جستجو..."
        noOptionsMessage={() => "مهارت جویی با این مشخصات یافت نشد"}
        loadingMessage={() => "لطفا کمی صبر کنید"}
      />
    </>
  );
};

export default JustTest;
