import React from "react";
import { Grid, List } from "@mui/material";
import { AfterWeekType } from "../../model";
import { fieldOptions, finalResults } from "../search/searchOptions";
import {
  comAccessStatusOpt,
  notifyAcceptWeekOpt,
  presentStatusOpt,
  recommendFieldOpt,
  recommendFieldMentorOpt,
  scholarOpt,
  workshopContOpt,
  yesOrNo,
} from "./helper";
import useSWR from "swr";
import { RELATED_PATH, RelatedPath } from "../addNewCourseComp/CareerPathway";
import EditString from "../ui-comp/EditString";
import { EditingSelective } from "../ui-comp/EditingSelective";
import LayoutReg from "../layout/LayoutReg";

interface AfterWeekStudentEdit {
  student: AfterWeekType | null;
  handleChange: (e: any) => void;
}

const AfterWeekDetailEditComp: React.FC<AfterWeekStudentEdit> = ({
  student,
  handleChange,
}) => {
  const { data } = useSWR<RelatedPath[]>(RELATED_PATH);

  if (student?.afterWeekChecked) {
    return (
      <LayoutReg title="ثبت نام نهایی">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              {data && (
                <EditingSelective
                  handleChange={handleChange}
                  placeholder="مسیر آموزشی نهایی"
                  options={data.map((i) => ({ label: i.name, value: i.id }))}
                  value={student?.careerPathwayId}
                  identifier="careerPathwayId"
                />
              )}
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
    );
  }

  return (
    <>
      {/* فرم ثبت نام هفته پذیرش */}
      <LayoutReg title="نتیجه کارگاه معارفه">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                handleChange={handleChange}
                identifier="workshopCont"
                options={workshopContOpt}
                placeholder="وضعیت شرکت در کارگاه معارفه"
                value={student?.workshopCont}
              />
              <EditingSelective
                handleChange={handleChange}
                identifier="notifyAcceptWeek"
                options={notifyAcceptWeekOpt}
                placeholder="اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن"
                value={student?.notifyAcceptWeek}
              />
              {data && (
                <EditingSelective
                  handleChange={handleChange}
                  identifier=""
                  placeholder="--انتخاب اولیه مسیر شغلی"
                  options={data.map((i) => ({ label: i.name, value: i.id }))}
                  value={student?.firstSelectJobRoad || ""}
                  disabled={true}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditString
                handleChange={handleChange}
                identifier="comLevelResult"
                placeholder="نتیجه تعیین سطح کامپیوتر"
                value={student?.comLevelResult || ""}
              />
              <EditString
                handleChange={handleChange}
                identifier="langScore"
                placeholder="نتیجه تعیین سطح زبان انگلیسی"
                value={student?.langScore || ""}
              />
              <EditString
                handleChange={handleChange}
                identifier="algoScore"
                placeholder="تعیین سطح الگوریتم و ریاضی"
                value={student?.algoScore || ""}
              />
              <EditString
                handleChange={handleChange}
                identifier="fundamentalSkillsScore"
                placeholder="نمره مهارت‌های پایه"
                value={student?.fundamentalSkillsScore || ""}
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* کارنامه هفته پذیرش */}
      <LayoutReg title="کارنامه هفته پذیرش">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditString
                handleChange={handleChange}
                identifier="algoLevelResult"
                placeholder="نتیجه تعیین سطح الگوریتم"
                value={student?.algoLevelResult || ""}
              />
              <EditingSelective
                options={presentStatusOpt}
                handleChange={handleChange}
                identifier="presentStatus"
                placeholder="وضعیت حضور و غیاب"
                value={student?.presentStatus || ""}
              />
            </List>
          </Grid>
          {/* <Grid item xs={12} md={6}>
          <List></List>
        </Grid> */}
        </Grid>
      </LayoutReg>
      {/* نظرات سرگروه */}
      <LayoutReg title="نظرات سرگروه">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="اختصاص زمان کافی به کاریار - سرگروه"
                handleChange={handleChange}
                identifier="consistCompleteTime"
                value={student?.consistCompleteTime}
                options={yesOrNo}
              />
              <EditingSelective
                placeholder="وضعیت دسترسی به کامپیوتر و اینترنت"
                handleChange={handleChange}
                identifier="comAccessStatus"
                value={student?.comAccessStatus}
                options={comAccessStatusOpt}
              />
              <EditString
                placeholder="پیش بینی ریزش"
                handleChange={handleChange}
                identifier="predict"
                value={student?.predict || ""}
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="تعهد به کار- سرگروه"
                handleChange={handleChange}
                identifier="jobCommit"
                value={student?.jobCommit}
                options={yesOrNo}
              />
              <EditingSelective
                placeholder="رشته پیشنهادی سرگروه"
                handleChange={handleChange}
                identifier="recommendField"
                value={student?.recommendField}
                options={recommendFieldOpt}
              />
              <EditString
                placeholder="سایر ریسک‌ها و محدودیت‌ها - سرگروه"
                handleChange={handleChange}
                identifier="etcDesc"
                value={student?.etcDesc || ""}
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* نظرات منتور */}
      <LayoutReg title="نظرات منتور">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                handleChange={handleChange}
                value={student?.consistTime}
                placeholder="اختصاص زمان کافی به کاریار"
                options={yesOrNo}
                identifier="consistTime"
              />
              <EditingSelective
                handleChange={handleChange}
                value={student?.recommendFieldMentor}
                placeholder="رشته پیشنهادی منتور"
                options={recommendFieldMentorOpt}
                identifier="recommendFieldMentor"
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                handleChange={handleChange}
                value={student?.workCommit}
                placeholder="تعهد به کار"
                identifier="workCommit"
                options={yesOrNo}
              />
              <EditString
                handleChange={handleChange}
                value={student?.limitAndRisk || ""}
                placeholder="سایر ریسک‌ها و محدودیت‌ها"
                identifier="limitAndRisk"
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* نهایی */}
      <LayoutReg title="ثبت نام نهایی">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                handleChange={handleChange}
                placeholder="نتیجه نهایی"
                options={finalResults}
                value={student?.finalResult}
                identifier="finalResult"
              />
              {data && (
                <EditingSelective
                  handleChange={handleChange}
                  placeholder="مسیر آموزشی نهایی"
                  options={data.map((i) => ({ label: i.name, value: i.id }))}
                  value={student?.careerPathwayId}
                  identifier="careerPathwayId"
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                handleChange={handleChange}
                identifier="scholar"
                value={student?.scholar ?? ""}
                placeholder="بورسیه دارد؟"
                options={scholarOpt}
              />
              {student?.scholar && (
                <EditString
                  handleChange={handleChange}
                  value={student?.scholarPercentage || ""}
                  placeholder="درصد بورسیه"
                  identifier="scholarPercentage"
                />
              )}

              <EditingSelective
                handleChange={handleChange}
                identifier="finalField"
                value={student?.finalField ?? ""}
                options={fieldOptions}
                placeholder="رشته نهایی"
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
    </>
  );
};

export default AfterWeekDetailEditComp;
