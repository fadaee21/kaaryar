import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";

export const SearchFirstName = ({ setOutputFirstName, searchPage, searchLink }: any) => {
  // const [inputValue, setValue] = useState<string>();

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
          // value={inputValue}
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
        />
      )}
      {searchPage === "beforeWeek" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.registrationForm.firstName}
          getOptionValue={(e: any) => e.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFirstName(e.registrationForm.firstName)}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
      {searchPage === "afterWeek" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.beforeWeekForm.registrationForm.firstName}
          getOptionValue={(e: any) => e.beforeWeekForm.registrationForm.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) =>
            setOutputFirstName(e.beforeWeekForm.registrationForm.firstName)
          }
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
      {searchPage === "moodle" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.firstName}
          getOptionValue={(e: any) => e.firstName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) =>
            setOutputFirstName(e.firstName)
          }
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
    </>
  );
};
