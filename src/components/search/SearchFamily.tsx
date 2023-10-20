import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";
import { memo } from "react";

const responseQuantity = "8";
const SearchFamily = ({
  setOutputFamily,
  outputFamily,
  searchPage,
  searchLink,
}: any) => {
  let typingTimer: ReturnType<typeof setTimeout>;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (inputValue: string, delayMs: number = 0) => {
    await delay(delayMs);
    try {
      const response = await getData(
        searchLink.replace("10000", responseQuantity),
        {
          params: {
            family: inputValue,
          },
        }
      );
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
      clearTimeout(typingTimer); // Clear the previous timer
      typingTimer = setTimeout(() => {
        resolve(fetchData(inputValue, 400)); // Fetch data after 400ms
      }, 500); // Set the delay before fetching data
    });

  return (
    <>
      {searchPage === "reg" && (
        <AsyncSelect
          isClearable
          value={outputFamily ? { family: outputFamily } : null}
          // defaultOptions={true}
          getOptionLabel={(e: any) => e.family}
          getOptionValue={(e: any) => e.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFamily(null);
            } else {
              setOutputFamily(selectedOption.family);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
            menu: (provided) => ({ ...provided, zIndex: 2 }),
          }}
        />
      )}
      {searchPage === "beforeWeek" && (
        <AsyncSelect
          isClearable
          value={
            outputFamily ? { registrationForm: { family: outputFamily } } : null
          }
          // defaultOptions={true}
          getOptionLabel={(e: any) => e.registrationForm.family}
          getOptionValue={(e: any) => e.registrationForm.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFamily(null);
            } else {
              setOutputFamily(selectedOption.registrationForm.family);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
            menu: (provided) => ({ ...provided, zIndex: 2 }),
          }}
        />
      )}
      {searchPage === "afterWeek" && (
        <AsyncSelect
          isClearable
          value={
            outputFamily
              ? {
                  beforeWeekForm: {
                    registrationForm: { family: outputFamily },
                  },
                }
              : null
          }
          // defaultOptions={true}
          getOptionLabel={(e: any) => e.beforeWeekForm.registrationForm.family}
          getOptionValue={(e: any) => e.beforeWeekForm.registrationForm.family}
          // onInputChange={(e) => setValue(e)}
          // onChange={(e: any) =>
          //   setOutputFamily(e.beforeWeekForm.registrationForm.family)
          // }
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFamily(null);
            } else {
              setOutputFamily(
                selectedOption.beforeWeekForm.registrationForm.family
              );
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
            menu: (provided) => ({ ...provided, zIndex: 2 }),
          }}
        />
      )}
      {searchPage === "moodle" && (
        <AsyncSelect
          isClearable
          value={outputFamily ? { family: outputFamily } : null}
          // defaultOptions={true}
          getOptionLabel={(e: any) => e.family}
          getOptionValue={(e: any) => e.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFamily(null);
            } else {
              setOutputFamily(selectedOption.family);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
            menu: (provided) => ({ ...provided, zIndex: 2 }),
          }}
        />
      )}
    </>
  );
};
export default memo(SearchFamily);
