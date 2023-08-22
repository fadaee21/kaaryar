import FileSaver from "file-saver";
import { utils, write } from "sheetjs-style/xlsx.mini";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getData } from "../api/axios";
import { seekerStateFinder } from "../utils/seekerStateFinder";

export const ExcelExport = ({ searchData, fileName, linkAll, useIn }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const exportAllFunc = async () => {
    try {
      let response = await getData(linkAll);
      let allData = await response.data;
      switch (useIn) {
        case "reg":
          const regObj = allData.map((reg) => ({
            وضعیت:
              reg.checked === true
                ? `تایید شده`
                : reg.checked === null
                ? `در انتظار تایید`
                : `رد شده`,
            " کد متقاضی": reg.registrationCode,
            "نام و نام خانوادگی": reg.firstName + " " + reg.family,
            گروه: reg.course,
            "میزان تحصیلات": reg.education,
            "سال دبیرستان": reg.highSchoolYear,
            استان: reg.province,
            "نحوه آشنایی با کاریار": reg.familiarity,
            "نام معرف یا موسسه": reg.refer,
            "تاریخ ارسال فرم":
              reg.createTime &&
              new Intl.DateTimeFormat("fa").format(new Date(reg.createTime)),
          }));

          exportToCSV(regObj, fileName);
          break;
        case "before":
          const beforeObj = allData.map((before) => {
            const {
              motivation,
              jobStandby,
              contCourseApproach,
              registrationForm: {
                province,
                city,
                family,
                firstName,
                registrationCode,
                mobile,
                email,
                course,
              },
              acceptWeekChecked,
            } = before;

            return {
              وضعیت:
                acceptWeekChecked === true
                  ? `تایید شده`
                  : acceptWeekChecked === null
                  ? `در انتظار تایید`
                  : `رد شده`,
              "کد متقاضی": registrationCode,
              "نام و نام خانوادگی": firstName + " " + family,
              گروه: course,
              استان: province,
              شهر: city,
              "شماره همراه": mobile,
              ایمیل: email,
              "نمره آزمون": contCourseApproach,
              "آمادگی کار": jobStandby ? "بله" : "خیر",
              "انگیزه ورود": motivation,
            };
          });
          exportToCSV(beforeObj, fileName);
          break;
        case "after":
          const afterObj = allData.map((after) => {
            const {
              finalField,
              scholar,
              finalResult,
              beforeWeekForm: {
                registrationForm: {
                  province,
                  city,
                  family,
                  firstName,
                  registrationCode,
                  mobile,
                  email,
                  course,
                },
              },
              afterWeekChecked,
            } = after;

            return {
              وضعیت:
                afterWeekChecked === true
                  ? `تایید شده`
                  : afterWeekChecked === null
                  ? `در انتظار تایید`
                  : `رد شده`,
              "کد متقاضی": registrationCode,
              "نام و نام خانوادگی": firstName + " " + family,
              گروه: course,
              استان: province,
              شهر: city,
              "شماره همراه": mobile,
              ایمیل: email,
              "نتیجه نهایی": finalResult,
              بورسیه: scholar ? "دارد" : "ندارد",
              "رشته نهایی": finalField,
            };
          });
          exportToCSV(afterObj, fileName);
          break;
        case "volunteer":
          let e = [];
          allData.forEach((i) => {
            const { imageAddress, custom, ...rest } = i; //remove imageAddress,custom
            e.push(rest);
          });
          exportToCSV(e, fileName);
          break;
        case "seeker":
          const seekerObj = allData.map((seekerStudent) => {
            const {
              regForm,
              afterWeekChecked,
              beforeWeekChecked,
              regChecked,
              AfterWeekForm,
            } = seekerStudent;

            return {
              وضعیت: seekerStateFinder(
                afterWeekChecked,
                beforeWeekChecked,
                regChecked
              ),
              "کد متقاضی": regForm.registrationCode,
              "نام و نام خانوادگی": regForm.firstName + " " + regForm.family,
              گروه: regForm.course,
              استان: regForm.province,
              شهر: regForm.city,
              "شماره همراه": regForm.mobile,
              ایمیل: regForm.email,
              "رشته انتخابی": regForm?.selectedField,
              "رشته نهایی": AfterWeekForm?.finalField,
              "نتیجه نهایی": AfterWeekForm?.finalResult,
            };
          });
          exportToCSV(seekerObj, fileName);
          break;
        case "studentListMoodleTable":
          const g = allData.map((i) => i);
          exportToCSV(g, fileName);
          break;
        case "studentOfAdmin":
          const d = allData.map((i) => ({
            "نام و نام خانوادگی": i.firstName + " " + i.family,
            "نام کاربری": i.username,
            شهر: i.registrationForm.city,
            استان: i.registrationForm.province,
            گروه: i.registrationForm.course,
            "مؤسسه معرف": i.registrationForm.refer,
            "وضعیت آموزش": i.statusForm?.trainingStatus?.value,
            "قدم آتی آموزش": i.statusForm?.nextTrainingStep?.value,
            "ارجاع به واحد مالی": i.statusForm?.referralToFinance?.value,
            "ارزیابی کاریار": i.statusForm?.kaaryarAssessment?.value,
          }));
          exportToCSV(d, fileName);
          // console.log(d);

          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    exportToCSV(searchData, fileName);
  };

  return (
    <Button
      sx={{ ml: "auto" }}
      color="secondary"
      endIcon={<FileDownloadIcon />}
      variant="contained"
      onClick={searchData ? handleClick : exportAllFunc}
    >
      خروجی اکسل
    </Button>
  );
};
