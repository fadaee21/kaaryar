import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";
import { ModuleAll } from "../../model";

interface Prop {
  setModuleName: React.Dispatch<React.SetStateAction<ModuleAll | null>>;
  moduleName: ModuleAll | null;
  moduleType: string;
  moduleSubType: string;
  settingResponse:string
}
const CourseNameSearch = ({
  moduleName,
  setModuleName,
  moduleType,
  moduleSubType,
  settingResponse
}: Prop) => {
  let typingTimer: ReturnType<typeof setTimeout>;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const fetchData = async (inputValue: string, delayMs: number = 0) => {
    await delay(delayMs);
    try {
      const response = await getData(`/modules/search?${settingResponse}`, {
        params: {
          moduleName: inputValue,
          moduleType: moduleType,
          moduleSubType: moduleSubType,
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
      clearTimeout(typingTimer); // Clear the previous timer
      typingTimer = setTimeout(() => {
        resolve(fetchData(inputValue, 400)); // Fetch data after 400ms
      }, 500); // Set the delay before fetching data
    });

  return (
    <AsyncSelect
      value={moduleName}
      defaultOptions={true}
      getOptionLabel={(e: any) => e.name}
      getOptionValue={(e: any) => e.name}
      // onInputChange={(e) => setValue(e)}
      onChange={(e) => setModuleName(e)}
      cacheOptions
      loadOptions={promiseOptions}
      placeholder="نام دوره"
      noOptionsMessage={() => "دوره ای با این مشخصات یافت نشد"}
      loadingMessage={() => "لطفا کمی صبر کنید"}
      name="searchCourseName"
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3rem",
        }),
        menu: (provided) => ({ ...provided, zIndex: 2 }),
      }}
    />
  );
};

export default CourseNameSearch;
