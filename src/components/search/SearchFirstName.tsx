import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";
import { memo } from "react";

const responseQuantity = "8";
const SearchFirstName = ({
  setOutputFirstName,
  outputFirstName,
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
            firstName: inputValue,
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
          value={outputFirstName ? { firstName: outputFirstName } : null}
          // defaultOptions={true}
          getOptionLabel={(e) => e.firstName}
          getOptionValue={(e) => e.firstName}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFirstName(null);
            } else {
              setOutputFirstName(selectedOption.firstName);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
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
            outputFirstName
              ? { registrationForm: { firstName: outputFirstName } }
              : null
          }
          // defaultOptions={true}
          getOptionLabel={(e) => e.registrationForm.firstName}
          getOptionValue={(e) => e.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFirstName(null);
            } else {
              setOutputFirstName(selectedOption.registrationForm.firstName);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
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
            outputFirstName
              ? {
                  beforeWeekForm: {
                    registrationForm: { firstName: outputFirstName },
                  },
                }
              : null
          }
          // defaultOptions={true}
          getOptionLabel={(e) => e.beforeWeekForm.registrationForm.firstName}
          getOptionValue={(e) => e.beforeWeekForm.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFirstName(null);
            } else {
              setOutputFirstName(
                selectedOption.beforeWeekForm.registrationForm.firstName
              );
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
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
          value={outputFirstName ? { firstName: outputFirstName } : null}
          // defaultOptions={true}
          getOptionLabel={(e) => e.firstName}
          getOptionValue={(e) => e.firstName}
          onChange={(selectedOption) => {
            if (selectedOption === null) {
              setOutputFirstName(null);
            } else {
              setOutputFirstName(selectedOption.firstName);
            }
          }}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
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

export default memo(SearchFirstName);
