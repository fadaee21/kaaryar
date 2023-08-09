import React, { useEffect, useState } from "react";
import CourseNameSearch from "./CourseNameSearch";
import {
  CareerPathway,
  GroupArray,
  Instructor,
  ModuleAll,
  ModuleSubType,
  ModuleType,
} from "../../model";
import { Button, Grid } from "@mui/material";
import { GreyButton } from "../../styles/Button";
import { getData } from "../../api/axios";
import SearchIcon from "@mui/icons-material/Search";
import InstructorSearch from "./InstructorsSearch";
import useSWR from "swr";
import SelectiveSearchCourse from "./SelectiveSearchCourse";
import { statusCourseOpt } from "../../pages/addNewCourse/addNewCourseHelper";
import SearchString from "../search/SearchString";

type ValType = { value: number | string; label: string };
interface Props {
  moduleSubType: ModuleSubType;
  moduleType: ModuleType;
  chevronDir: boolean;
  setSearchCourseCore: React.Dispatch<any>;
  settingResponse: string;
}
const SearchAllCourse = ({
  moduleSubType,
  moduleType,
  chevronDir,
  setSearchCourseCore,
  settingResponse,
}: Props) => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [moduleName, setModuleName] = useState<ModuleAll | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [nonLmsInstructors, setNonLmsInstructors] = useState<string | null>(
    null
  );
  const [careerPathway, setCareerPathway] = useState<ValType | null>(null);
  const [statusCourse, setStatusCourse] = useState<ValType | null>(null);
  const [moduleCategory, setModuleCategory] = useState<ValType | null>(null);
  //disable search and clear buttons
  useEffect(() => {
    const buttonStatus = ![
      moduleName,
      instructor,
      careerPathway?.value,
      moduleCategory?.value,
      statusCourse?.value,
      nonLmsInstructors,
    ].some(Boolean);
    setDisabledButton(buttonStatus);
  }, [
    nonLmsInstructors,
    moduleName,
    instructor,
    careerPathway?.value,
    moduleCategory?.value,
    statusCourse?.value,
  ]);

  //if AccordionDetails is close, do nothing(fetching data and mounting component)
  const { data: careerPathwayOptions } = useSWR<CareerPathway[]>(
    chevronDir ? "/modules/career-pathways/short-details/all" : null
  );
  const { data: moduleCategoryOptions } = useSWR<GroupArray>(
    chevronDir ? "/modules/categories/short-details/all" : null
  );
  if (!chevronDir) {
    return <></>;
  }

  const fetchData = async (obj: any) => {
    try {
      const response = await getData(`/modules/search?${settingResponse}`, {
        params: obj,
      });
      console.log(response);
      if (response.status === 200) {
        //for each search you need specific setState
        setSearchCourseCore(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchData({
      moduleSubType,
      moduleType,
      moduleName: moduleName?.name,
      includeInstructorIds: instructor?.id,
      includeCareerpathwaysIds: careerPathway?.value,
      includeCategoryIds: moduleCategory?.value,
      teachingStatus: statusCourse?.value,
      instructorName: nonLmsInstructors,
    });
  };
  const clearSearch = () => {
    setModuleName(null);
    setInstructor(null);
    setCareerPathway(null);
    setStatusCourse(null);
    setStatusCourse(null);
    setModuleCategory(null);
    setStatusCourse(null);
    setNonLmsInstructors(null);
    setSearchCourseCore(undefined);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CourseNameSearch
          moduleName={moduleName}
          setModuleName={setModuleName}
          moduleSubType={moduleSubType}
          moduleType={moduleType}
          settingResponse={settingResponse}
        />
      </Grid>
      <Grid item xs={3}>
        {moduleSubType !== "english_module" ? (
          <InstructorSearch
            instructor={instructor}
            setInstructor={setInstructor}
          />
        ) : (
          <SearchString
            state={nonLmsInstructors}
            setState={setNonLmsInstructors}
            label="نام مدرس(ها)"
          />
        )}
      </Grid>
      {["workshop", "english_module"].every((i) => i !== moduleSubType) && (
        <>
          {["interpersonal_skills", "english_module"].every(
            (i) =>
              i !== moduleSubType && (
                <Grid item xs={3}>
                  <SelectiveSearchCourse
                    state={careerPathway}
                    setState={setCareerPathway}
                    options={careerPathwayOptions?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder="مسیر مرتبط"
                  />
                </Grid>
              )
          )}

          <Grid item xs={3}>
            <SelectiveSearchCourse
              state={statusCourse}
              setState={setStatusCourse}
              options={statusCourseOpt}
              placeholder="وضعیت دوره"
            />
          </Grid>
          <Grid item xs={3}>
            <SelectiveSearchCourse
              state={moduleCategory}
              setState={setModuleCategory}
              options={moduleCategoryOptions?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              placeholder="گروه مرتبط"
            />
          </Grid>
        </>
      )}

      <Grid item xs={3} sx={{ ml: "auto" }}>
        <GreyButton
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={clearSearch}
          disabled={disabledButton}
        >
          پاک کردن
        </GreyButton>
      </Grid>
      <Grid item flex={1}>
        <Button
          sx={{ width: "100%" }}
          endIcon={<SearchIcon sx={{ rotate: "90deg" }} />}
          variant="outlined"
          onClick={handleSearch}
          disabled={disabledButton}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchAllCourse;
