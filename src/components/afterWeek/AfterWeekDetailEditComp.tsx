import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import { AfterWeekType } from "../../model";
import { fieldOptions, finalResults } from "../search/searchOptions";

interface AfterWeekStudentEdit {
  student: AfterWeekType | null;
  handleChange: (e: any) => void;
}

const AfterWeekDetailEditComp: React.FC<AfterWeekStudentEdit> = ({
  student,
  handleChange,
}) => {
  return (
    <>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="workshopCont">
                  وضعیت شرکت در کارگاه معارفه
                </InputLabel>
                <Input
                  id="workshopCont"
                  value={student?.workshopCont || ""}
                  onChange={handleChange}
                  name="workshopCont"
                />
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="notifyAcceptWeek">
                  اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن
                </InputLabel>
                <Input
                  id="notifyAcceptWeek"
                  value={student?.notifyAcceptWeek || ""}
                  onChange={handleChange}
                  name="notifyAcceptWeek"
                />
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="mbtiTest">نتیجه تست MBTI</InputLabel>
                <Input
                  id="mbtiTest"
                  value={student?.mbtiTest || ""}
                  onChange={handleChange}
                  name="mbtiTest"
                />
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="comLevelResult">
                  نتیجه تعیین سطح کامپیوتر
                </InputLabel>
                <Input
                  id="comLevelResult"
                  value={student?.comLevelResult || ""}
                  onChange={handleChange}
                  name="comLevelResult"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="firstSelectJobRoad">
                  انتخاب اولیه مسیر شغلی
                </InputLabel>
                <Input
                  id="firstSelectJobRoad"
                  value={student?.firstSelectJobRoad || ""}
                  onChange={handleChange}
                  name="firstSelectJobRoad"
                />
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="algoLevelResult">
                  نتیجه تعیین سطح الگوریتم
                </InputLabel>
                <Input
                  id="algoLevelResult"
                  value={student?.algoLevelResult || ""}
                  onChange={handleChange}
                  name="algoLevelResult"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="langScore">نمره تعیین سطح زیان</InputLabel>
                <Input
                  id="langScore"
                  value={student?.langScore}
                  onChange={handleChange}
                  name="langScore"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="algoScore">نمره آزمون الگوریتم</InputLabel>
                <Input
                  id="algoScore"
                  value={student?.algoScore}
                  onChange={handleChange}
                  name="algoScore"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="comScore">نمره آزمون کامپیوتر</InputLabel>
                <Input
                  id="comScore"
                  value={student?.comScore}
                  onChange={handleChange}
                  name="comScore"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="presentStatus">
                  وضعیت حضور و غیاب
                </InputLabel>
                <Input
                  id="presentStatus"
                  value={student?.presentStatus || ""}
                  onChange={handleChange}
                  name="presentStatus"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="comAccessStatus">
                  وضعیت دسترسی به کامپیوتر و اینترنت
                </InputLabel>
                <Input
                  id="comAccessStatus"
                  value={student?.comAccessStatus || ""}
                  onChange={handleChange}
                  name="comAccessStatus"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="predict">پیش بینی ریزش</InputLabel>
                <Input
                  id="predict"
                  value={student?.predict || ""}
                  onChange={handleChange}
                  name="predict"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="recommendField">
                  رشته پیشنهادی سرگروه
                </InputLabel>
                <Input
                  id="recommendField"
                  value={student?.recommendField || ""}
                  onChange={handleChange}
                  name="recommendField"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="limitAndRisk">
                  ریسک ها و محدودیت ها
                </InputLabel>
                <Input
                  id="limitAndRisk"
                  value={student?.limitAndRisk || ""}
                  onChange={handleChange}
                  name="limitAndRisk"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="consistCompleteTime">
                  اختصاص وقت کافی به کاریار
                </InputLabel>
                <Input
                  id="consistCompleteTime"
                  value={student?.consistCompleteTime || ""}
                  onChange={handleChange}
                  name="consistCompleteTime"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="jobCommit">تعهد به اشتغال</InputLabel>
                <Input
                  id="jobCommit"
                  value={student?.jobCommit || ""}
                  onChange={handleChange}
                  name="jobCommit"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="etcDesc">سایر ملاحظات</InputLabel>
                <Input
                  id="etcDesc"
                  value={student?.etcDesc || ""}
                  onChange={handleChange}
                  name="etcDesc"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="workCommit">تعهد به کار</InputLabel>
                <Input
                  id="workCommit"
                  value={student?.workCommit || ""}
                  onChange={handleChange}
                  name="workCommit"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="consistTime">اختصاص زمان کافی</InputLabel>
                <Input
                  id="consistTime"
                  value={student?.consistTime || ""}
                  onChange={handleChange}
                  name="consistTime"
                />
              </FormControl>
            </ListItem>
            {/* <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="comAccessStatus">
                  دسترسی به کامپیوتر و اینترنت
                </InputLabel>
                <Input
                  id="comAccessStatus"
                  value={student?.comAccessStatus || ""}
                  onChange={handleChange}
                  name="comAccessStatus"
                />
              </FormControl>
            </ListItem> */}
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="ethics">اخلاق فردی و حرفه ای</InputLabel>
                <Input
                  id="ethics"
                  value={student?.ethics || ""}
                  onChange={handleChange}
                  name="ethics"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="finalResult">نتیجه نهایی</InputLabel>
                <Select
                  labelId="finalResult"
                  id="finalResult"
                  name="finalResult"
                  value={student?.finalResult || ""}
                  label="نتیجه نهایی"
                  onChange={handleChange}
                >
                  {finalResults.map((finalResult) => (
                    <MenuItem key={finalResult.label} value={finalResult.value}>
                      {finalResult.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="scholar">
                بورسیه دارد؟
                </InputLabel>
                <Input
                  id="scholar"
                  value={student?.scholar || ""}
                  onChange={handleChange}
                  name="scholar"
                />
              </FormControl> */}
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="scholar">بورسیه دارد؟</InputLabel>
                <Select
                  labelId="scholar"
                  id="scholar"
                  onChange={handleChange}
                  name="scholar"
                  value={student?.scholar ?? ""}
                >
                  <MenuItem value={true as any}>بله</MenuItem>
                  <MenuItem value={false as any}>خیر</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="scholarPercentage">درصد بورسیه</InputLabel>
                <Input
                  id="scholarPercentage"
                  value={student?.scholarPercentage || ""}
                  onChange={handleChange}
                  name="scholarPercentage"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="finalField">رشته نهایی</InputLabel>
                <Select
                  labelId="finalField"
                  id="finalField"
                  onChange={handleChange}
                  name="finalField"
                  value={student?.finalField ?? ""}
                >
                  {fieldOptions.map((fieldOption, i) => (
                    <MenuItem key={i} value={fieldOption.value}>
                      {fieldOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default AfterWeekDetailEditComp;
