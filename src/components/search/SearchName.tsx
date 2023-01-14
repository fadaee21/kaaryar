import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";

export const SearchName = ({ setOutputName, searchPage, searchLink }: any) => {
  // const [inputValue, setValue] = useState<string>();

  const fetchData = async (inputValue: string) => {
    try {
      const response = await getData(searchLink, {
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
      {searchPage === "reg" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.firstName + " " + e.family}
          getOptionValue={(e: any) => e.firstName + e.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputName(e.family)} //just family (not first name) it may cause BUG if you have 2 person with same family
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام و نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
      {searchPage === "beforeWeek" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) =>
            e.registrationForm.firstName + " " + e.registrationForm.family
          }
          getOptionValue={(e: any) =>
            e.registrationForm.firstName + e.registrationForm.family
          }
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputName(e.registrationForm.family)} //just family (not first name) it may cause BUG if you have 2 person with same family
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام و نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
      {searchPage === "afterWeek" && (
        <AsyncSelect
          // value={inputValue}
          defaultOptions={true}
          getOptionLabel={(e: any) =>
            e.beforeWeekForm.registrationForm.firstName +
            " " +
            e.beforeWeekForm.registrationForm.family
          }
          getOptionValue={(e: any) =>
            e.beforeWeekForm.registrationForm.firstName +
            e.beforeWeekForm.registrationForm.family
          }
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) =>
            setOutputName(e.beforeWeekForm.registrationForm.family)
          } //just family (not first name) it may cause BUG if you have 2 person with same family
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام و نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
        />
      )}
    </>
  );
};
