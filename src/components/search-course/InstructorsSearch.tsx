import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";
import { Instructor } from "../../model";

interface Prop {
  setInstructor: React.Dispatch<React.SetStateAction<Instructor | null>>;
  instructor: Instructor | null;
}
const InstructorSearch = ({ instructor, setInstructor }: Prop) => {
  let typingTimer: ReturnType<typeof setTimeout>;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const fetchData = async (inputValue: string, delayMs: number = 0) => {
    await delay(delayMs);
    try {
      const response = await getData("/modules/personnel/search", {
        params: {
          name: inputValue,
          role: "instructor",
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
      value={instructor}
      defaultOptions={true}
      getOptionLabel={(e: any) => e.firstName + " " + e.family}
      getOptionValue={(e: any) => e.firstName + " " + e.family}
      // onInputChange={(e) => setValue(e)}
      onChange={(e) => setInstructor(e)}
      cacheOptions
      loadOptions={promiseOptions}
      placeholder="نام مدرس(ها)"
      noOptionsMessage={() => "مدرسی با این مشخصات یافت نشد"}
      loadingMessage={() => "لطفا کمی صبر کنید"}
      name="searchInstructor"
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

export default InstructorSearch;
