import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";

export const SearchFirstName = ({
  setOutputFirstName,
  outputFirstName,
  searchPage,
  searchLink,
}: any) => {
  const fetchData = async (inputValue: string) => {
    try {
      const response = await getData(searchLink, {
        params: {
          firstName: inputValue,
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
      {searchPage === "reg" && (
        <AsyncSelect
          value={outputFirstName ? { firstName: outputFirstName } : null}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.firstName}
          getOptionValue={(e: any) => e.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFirstName(e.firstName)}
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
          value={
            outputFirstName
              ? { registrationForm: { firstName: outputFirstName } }
              : null
          }
          defaultOptions={true}
          getOptionLabel={(e: any) => e.registrationForm.firstName}
          getOptionValue={(e: any) => e.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) =>
            setOutputFirstName(e.registrationForm.firstName)
          }
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
          value={
            outputFirstName
              ? {
                  beforeWeekForm: {
                    registrationForm: { firstName: outputFirstName },
                  },
                }
              : null
          }
          defaultOptions={true}
          getOptionLabel={(e) => e.beforeWeekForm.registrationForm.firstName}
          getOptionValue={(e) => e.beforeWeekForm.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e) => {
            setOutputFirstName(e?.beforeWeekForm.registrationForm.firstName);
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
          value={outputFirstName ? { firstName: outputFirstName } : null}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.firstName}
          getOptionValue={(e: any) => e.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFirstName(e.firstName)}
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
