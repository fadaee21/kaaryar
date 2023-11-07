import React from "react";
import { Grid, List } from "@mui/material";
import {
  acquaintanceOptions,
  eduLevelOptions,
  highSchoolOptions,
  provinceOptions,
  uniSemesterOptions,
} from "../search/searchOptions";
import { EditingSelective } from "../ui-comp/EditingSelective";
import EditString from "../ui-comp/EditString";
import useSWR from "swr";
import { RELATED_PATH, RelatedPath } from "../addNewCourseComp/CareerPathway";
import LayoutReg from "../layout/LayoutReg";
import { RegistrationForm } from "../../model";

interface RegStudent {
  student: RegistrationForm | null;
  handleChange: (e: any) => void;
}
export interface CHARITY_RESPONSE {
  value: string;
  id: number;
}
const CHARITY = "/reg/wp/charity-orgs/values/all";
const RegisterFormDetailEditComp: React.FC<RegStudent> = ({
  student,
  handleChange,
}) => {
  const { data: careerPathwayData, isLoading } =
    useSWR<RelatedPath[]>(RELATED_PATH);
  const { data: charityData, isLoading: charityLoading } =
    useSWR<CHARITY_RESPONSE[]>(CHARITY);

  const referCondition =
    student?.familiarity?.trim() === "معرف" ||
    student?.familiarity?.trim() === "other";
  const CharitableCondition =
    student?.familiarity?.trim() === "موسسات نیکوکاری";

  return (
    <LayoutReg title="فرم ثبت اطلاعات اولیه">
      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <EditString
              handleChange={handleChange}
              identifier="token"
              placeholder="کد متقاضی"
              value={student?.registrationCode || ""}
            />

            <EditString
              handleChange={handleChange}
              identifier="firstName"
              placeholder="نام"
              value={student?.firstName || ""}
            />

            <EditString
              handleChange={handleChange}
              identifier="family"
              placeholder="نام خانوادگی"
              value={student?.family || ""}
            />

            <EditingSelective
              handleChange={handleChange}
              value={student?.province?.trimEnd() || ""}
              placeholder="استان"
              options={provinceOptions}
              identifier="province"
            />

            <EditString
              handleChange={handleChange}
              identifier="city"
              placeholder="شهر"
              value={student?.city || ""}
            />

            <EditingSelective
              options={acquaintanceOptions}
              placeholder="نحوه آشنایی"
              handleChange={handleChange}
              value={student?.familiarity?.trim() || ""}
              identifier="familiarity"
            />
            {referCondition && (
              <EditString
                placeholder="نام معرف یا موسسه"
                handleChange={handleChange}
                value={student?.refer || ""}
                identifier="refer"
              />
            )}
            {CharitableCondition && !!charityData && (
              <EditingSelective
                // options={CharityOptions}
                value={student?.refer || ""}
                disabled={charityLoading && !!charityData}
                options={charityData?.map((i) => ({
                  label: i.value,
                  value: i.id,
                }))}
                placeholder="نام موسسه خیریه"
                handleChange={handleChange}
                identifier="refer"
              />
            )}

            <EditString
              placeholder="سال تولد"
              handleChange={handleChange}
              value={student?.birthDate || ""}
              identifier="birthDate"
            />
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <EditString
              placeholder="شماره همراه"
              handleChange={handleChange}
              value={student?.mobile || ""}
              identifier="mobile"
            />

            <EditString
              placeholder="ایمیل"
              handleChange={handleChange}
              value={student?.email || ""}
              identifier="email"
            />

            <EditingSelective
              options={eduLevelOptions}
              placeholder="میزان تحصیلات"
              handleChange={handleChange}
              value={student?.education || ""}
              identifier="education"
            />

            <EditingSelective
              options={highSchoolOptions}
              placeholder="سال دبیرستان"
              handleChange={handleChange}
              value={student?.highSchoolYear || ""}
              identifier="highSchoolYear"
            />

            <EditingSelective
              options={uniSemesterOptions}
              placeholder="ترم دانشگاه"
              handleChange={handleChange}
              value={student?.uniSemester || ""}
              identifier="uniSemester"
            />

            <EditString
              placeholder="رشته تحصیلی"
              handleChange={handleChange}
              value={student?.studyField || ""}
              identifier="studyField"
            />

            <EditingSelective
              disabled={isLoading && !!careerPathwayData}
              options={careerPathwayData?.map((i) => ({
                label: i.name,
                value: i.id,
              }))}
              placeholder="رشته انتخابی در کاریار"
              handleChange={handleChange}
              value={student?.careerPathwayId || ""}
              identifier="careerPathwayId"
            />

            <EditString
              placeholder="مسیر مورد نظر متقاضی"
              handleChange={handleChange}
              value={student?.careerPathwayOther || ""}
              identifier="careerPathwayOther"
            />

            <EditString
              placeholder="توضیحات سایر"
              handleChange={handleChange}
              value={student?.description || ""}
              identifier="description"
            />
          </List>
        </Grid>
      </Grid>
    </LayoutReg>
  );
};

export default RegisterFormDetailEditComp;
