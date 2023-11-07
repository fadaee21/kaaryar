import FileSaver from "file-saver";
import { utils, write } from "sheetjs-style/xlsx.mini";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getData } from "../api/axios";
// import { seekerStateFinder } from "../utils/seekerStateFinder";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getLabel } from "../utils/getLabel";
import { internetAccessOpt } from "./beforeWeek/helper";

export const ExcelExport = ({ searchData, fileName, linkAll, useIn }) => {
  const [loading, setLoading] = useState(false);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const columnOrder = Object.keys(apiData[0]); // Get the keys in the order they are defined
    // Create an array to store the data in the desired order
    const dataInOrder = apiData.map((item) => {
      const orderedItem = {};
      columnOrder.forEach((column) => {
        orderedItem[column] = item[column];
      });
      return orderedItem;
    });

    const ws = utils.json_to_sheet(dataInOrder);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const exportAllFunc = async () => {
    setLoading(true);
    try {
      let response = await getData(linkAll);
      let allData = await response.data;
      switch (useIn) {
        case "reg":
          const regObj = allData.map((reg, inx) => ({
            // وضعیت:
            //   reg.checked === true
            //     ? `تایید شده`
            //     : reg.checked === null
            //     ? `در انتظار تایید`
            //     : `رد شده`,
            // " کد متقاضی": reg.registrationCode,
            "نام و نام خانوادگی": reg.firstName + " " + reg.family,
            استان: reg.province,
            شهر: reg.city,
            گروه: reg.course,
            "سال تولد": reg.birthDate,
            "نحوه آشنایی": reg.familiarity,
            "نام معرف یا موسسه": reg.refer,
            "شماره همراه": reg.mobile,
            ایمیل: reg.email,
            "میزان تحصیلات": reg.education,
            "سال دبیرستان": reg.highSchoolYear,
            "ترم دانشگاه": reg.uniSemester,
            "رشته تحصیلی": reg.studyField,
            "توضیحات سایر": reg.description,
            "تاریخ ارسال فرم":
              reg.createdAt &&
              new Intl.DateTimeFormat("fa").format(new Date(reg.createdAt)),
            "تاریخ تایید/رد فرم":
              reg.decidedAt &&
              new Intl.DateTimeFormat("fa").format(new Date(reg.decidedAt)),
            "رشته انتخابی در کاریار ": reg.selectedField,
            // "مسیر مورد نظر متقاضی": reg.careerPathwayOther,
          }));

          exportToCSV(regObj, fileName);
          break;
        case "before":
          const beforeObj = allData.map((before) => {
            const {
              registrationForm: {
                province,
                city,
                family,
                firstName,
                // registrationCode,
                mobile,
                email,
                course,
                birthDate,
                familiarity,
                refer,
                education,
                highSchoolYear,
                uniSemester,
                studyField,
                description,
                decidedAt,
                createdAt,
                selectedField,
              },
              motivation,
              jobStandby,
              // contCourseApproach,
              isCurrentlyStudent,
              lastInstitute,
              cgpa,
              // acceptWeekChecked,
              skills,
              jobStatus,
              noneJobActivation,
              employmentType,
              avgSalary,
              employmentTimeCommitment,
              jobTitle,
              jobVision,
              accessTime,
              webDevFamiliarity,
              computerFamiliarity,
              computerAccess,
              codingKnowledge,
              internetAccessDevice,
              internetAccessTiming,
              limitTime,
              questionCity,
              questionNumbers,
              questionMultiplication,
              questionStudents,
              questionDiameters,
              questionWords,
              engPara,
              levelDiscreteMath,
              levelLinearAlgebra,
              levelProbabilities,
              levelFlowDiagrams,
              levelAlgorithms,
              levelDataStructures,
              levelLogics,
              applicantAdditionalComments,
              administrativeComments,
              decidedAt: decidedAtBefore,
              createdAt: createdAtBefore,
            } = before;

            return {
              // وضعیت:
              //   acceptWeekChecked === true
              //     ? `تایید شده`
              //     : acceptWeekChecked === null
              //     ? `در انتظار تایید`
              //     : `رد شده`,
              // "کد متقاضی": registrationCode,
              "نام و نام خانوادگی": firstName + " " + family,
              استان: province,
              شهر: city,
              گروه: course,
              "سال تولد": birthDate,
              "نحوه آشنایی": familiarity,
              "نام معرف یا موسسه": refer,
              "رشته انتخابی در کاریار ": selectedField,
              "شماره همراه": mobile,
              ایمیل: email,
              "میزان تحصیلات": education,
              "سال دبیرستان": highSchoolYear,
              "ترم دانشگاه": uniSemester,
              "رشته تحصیلی": studyField,
              "توضیحات سایر": description,
              "تاریخ ارسال فرم":
                createdAt &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAt)),
              "تاریخ تایید/رد فرم":
                decidedAt &&
                new Intl.DateTimeFormat("fa").format(new Date(decidedAt)),
              "در حال حاضر مشغول به تحصیل هستید؟": isCurrentlyStudent
                ? "بله"
                : "خیر",
              "نام موسسه آموزشی آخرین مقطع تحصیلی": lastInstitute,
              "میانگین معدل آخرین مقطع تحصیلی": cgpa,
              "تجربه یا استعداد تحصیلی": skills,
              "وضعیت فعلی اشتغال": jobStatus
                ? "مشغول کار منجر به درآمد هستم"
                : "مشغول کار منجر به درآمد نیستم",
              "مشغولیت‌های فعلی": noneJobActivation,
              "نوع کار": employmentType,
              "متوسط حقوق ماهیانه": avgSalary,
              "زمان صرف شده برای کار": employmentTimeCommitment,
              "نوع و سمت شغلی": jobTitle,
              "چشم انداز شغلی دوسال آینده": jobVision,
              "وقت آزاد برای مطالعه و تمرین های کاریار": accessTime,
              "آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب":
                webDevFamiliarity,
              "آمادگی اشتغال به محض اتمام دوره کاریار": jobStandby
                ? "بله"
                : "خیر",
              "آشنایی کار با کامپیوتر": computerFamiliarity,
              "میزان دسترسی به کامپیوتر": computerAccess,
              "آیا تا به حال دوره آموزشی در ارتباط با مهارت های کامپیوتر یا کدنویسی گذرانده اید؟":
                codingKnowledge,
              "ابزار دسترسی به اینترنت": getLabel(
                internetAccessDevice,
                internetAccessOpt
              ),
              "ساعات دسترسی به اینترنت": internetAccessTiming,
              "محدودیت زمانی": limitTime,
              "انگیزه ورود به کاریار": motivation,
              "آتشنشان در شهر خیالی": questionCity,
              "تعداد یک بین 100 تا 200": questionNumbers,
              "تعداد صفر حاصل ضرب یک تا 50": questionMultiplication,
              "محاسبه نرخ اشتغال": questionStudents,
              "تعداد قطر هفت ضلعی": questionDiameters,
              "حرف ایجادی از اشکال": questionWords,
              "یک پاراگراف درباره خود به انگلیسی": engPara,
              "ریاضیات گسسته": levelDiscreteMath,
              "جبر خطی": levelLinearAlgebra,
              "آمار و احتمال": levelProbabilities,
              فلوچارت: levelFlowDiagrams,
              الگوریتم: levelAlgorithms,
              "ساختارهای داده": levelDataStructures,
              "منطق (Logic)": levelLogics,
              توضیحات: applicantAdditionalComments,
              "توضیحات ادمین": administrativeComments,
              "تاریخ ارسال فرم ارزیابی":
                createdAtBefore &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAtBefore)),
              "تاریخ تایید/رد فرم ارزیابی":
                decidedAtBefore &&
                new Intl.DateTimeFormat("fa").format(new Date(decidedAtBefore)),
            };
          });
          exportToCSV(beforeObj, fileName);
          break;
        case "after":
          const afterObj = allData.map((after) => {
            const {
              // finalField,
              // scholar,
              // finalResult,
              beforeWeekForm: {
                registrationForm: {
                  province,
                  city,
                  family,
                  firstName,
                  // registrationCode,
                  mobile,
                  email,
                  course,
                  birthDate,
                  familiarity,
                  refer,
                  education,
                  highSchoolYear,
                  uniSemester,
                  studyField,
                  description,
                  decidedAt,
                  createdAt,
                  selectedField,
                },
                motivation,
                jobStandby,
                // contCourseApproach,
                isCurrentlyStudent,
                lastInstitute,
                cgpa,
                // acceptWeekChecked,
                skills,
                jobStatus,
                noneJobActivation,
                employmentType,
                avgSalary,
                employmentTimeCommitment,
                jobTitle,
                jobVision,
                accessTime,
                webDevFamiliarity,
                computerFamiliarity,
                computerAccess,
                codingKnowledge,
                internetAccessDevice,
                internetAccessTiming,
                limitTime,
                questionCity,
                questionNumbers,
                questionMultiplication,
                questionStudents,
                questionDiameters,
                questionWords,
                engPara,
                levelDiscreteMath,
                levelLinearAlgebra,
                levelProbabilities,
                levelFlowDiagrams,
                levelAlgorithms,
                levelDataStructures,
                levelLogics,
                applicantAdditionalComments,
                administrativeComments,
                decidedAt: decidedAtBefore,
                createdAt: createdAtBefore,
              },
              // afterWeekChecked,
              workshopCont,
              notifyAcceptWeek,
              firstSelectJobRoad,
              comLevelResult,
              langScore,
              algoScore,
              fundamentalSkillsScore,
              algoLevelResult,
              presentStatus,
              consistCompleteTime,
              comAccessStatus,
              predict,
              jobCommit,
              recommendField,
              etcDesc,
              consistTime,
              recommendFieldMentor,
              workCommit,
              limitAndRisk,
              scholar,
              scholarPercentage,
              finalField,
              careerPathway,
              createdAt: createdAtAfter,
            } = after;

            return {
              // وضعیت:
              //   afterWeekChecked === true
              //     ? `تایید شده`
              //     : afterWeekChecked === null
              //     ? `در انتظار تایید`
              //     : `رد شده`,
              // "کد متقاضی": registrationCode,
              "نام و نام خانوادگی": firstName + " " + family,
              استان: province,
              شهر: city,
              گروه: course,
              "سال تولد": birthDate,
              "نحوه آشنایی": familiarity,
              "نام معرف یا موسسه": refer,
              "شماره همراه": mobile,
              ایمیل: email,
              "میزان تحصیلات": education,
              "سال دبیرستان": highSchoolYear,
              "ترم دانشگاه": uniSemester,
              "رشته تحصیلی": studyField,
              "توضیحات سایر": description,
              "تاریخ ارسال فرم":
                createdAt &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAt)),
              "تاریخ تایید/رد فرم":
                decidedAt &&
                new Intl.DateTimeFormat("fa").format(new Date(decidedAt)),
              "رشته انتخابی": selectedField,
              "در حال حاضر مشغول به تحصیل هستید؟": isCurrentlyStudent
                ? "بله"
                : "خیر",
              "نام موسسه آموزشی آخرین مقطع تحصیلی": lastInstitute,
              "میانگین معدل آخرین مقطع تحصیلی": cgpa,
              "تجربه یا استعداد تحصیلی": skills,
              "وضعیت فعلی اشتغال": jobStatus
                ? "مشغول کار منجر به درآمد هستم"
                : "مشغول کار منجر به درآمد نیستم",
              "مشغولیت‌های فعلی": noneJobActivation,
              "نوع کار": employmentType,
              "متوسط حقوق ماهیانه": avgSalary,
              "زمان صرف شده برای کار": employmentTimeCommitment,
              "نوع و سمت شغلی": jobTitle,
              "چشم انداز شغلی دوسال آینده": jobVision,
              "وقت آزاد برای مطالعه و تمرین های کاریار": accessTime,
              "آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب":
                webDevFamiliarity,
              "آمادگی اشتغال به محض اتمام دوره کاریار": jobStandby
                ? "بله"
                : "خیر",
              "آشنایی کار با کامپیوتر": computerFamiliarity,
              "میزان دسترسی به کامپیوتر": computerAccess,
              "آیا تا به حال دوره آموزشی در ارتباط با مهارت های کامپیوتر یا کدنویسی گذرانده اید؟":
                codingKnowledge,
              "ابزار دسترسی به اینترنت": getLabel(
                internetAccessDevice,
                internetAccessOpt
              ),
              "ساعات دسترسی به اینترنت": internetAccessTiming,
              "محدودیت زمانی": limitTime,
              "انگیزه ورود به کاریار": motivation,
              "آتشنشان در شهر خیالی": questionCity,
              "تعداد یک بین 100 تا 200": questionNumbers,
              "تعداد صفر حاصل ضرب یک تا 50": questionMultiplication,
              "محاسبه نرخ اشتغال": questionStudents,
              "تعداد قطر هفت ضلعی": questionDiameters,
              "حرف ایجادی از اشکال": questionWords,
              "یک پاراگراف درباره خود به انگلیسی": engPara,
              "ریاضیات گسسته": levelDiscreteMath,
              "جبر خطی": levelLinearAlgebra,
              "آمار و احتمال": levelProbabilities,
              فلوچارت: levelFlowDiagrams,
              الگوریتم: levelAlgorithms,
              "ساختارهای داده": levelDataStructures,
              "منطق (Logic)": levelLogics,
              توضیحات: applicantAdditionalComments,
              "توضیحات ادمین": administrativeComments,
              "تاریخ ارسال فرم ارزیابی":
                createdAtBefore &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAtBefore)),
              "تاریخ تایید/رد فرم ارزیابی":
                decidedAtBefore &&
                new Intl.DateTimeFormat("fa").format(new Date(decidedAtBefore)),
              "وضعیت شرکت در کارگاه معارفه": workshopCont,
              "اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن":
                notifyAcceptWeek,
              "انتخاب اولیه مسیر شغلی": firstSelectJobRoad,
              "نتیجه تعیین سطح کامپیوتر": comLevelResult,
              "نتیجه تعیین سطح زبان انگلیسی": langScore,
              "تعیین سطح الگوریتم و ریاضی": algoScore,
              "نمره مهارت‌های پایه": fundamentalSkillsScore,
              "نتیجه تعیین سطح الگوریتم": algoLevelResult,
              "وضعیت حضور و غیاب": presentStatus,
              "اختصاص زمان کافی به کاریار - سرگروه ": consistCompleteTime,
              "وضعیت دسترسی به کامپیوتر و اینترنت": comAccessStatus,
              "پیش بینی ریزش": predict,
              "تعهد به کار - سرگروه": jobCommit,
              "رشته پیشنهادی سرگروه": recommendField,
              "سایر ریسک‌ها و محدودیت‌ها -سرگروه": etcDesc,
              "اختصاص زمان کافی به کاریار - منتور": consistTime,
              "رشته پیشنهادی منتور": recommendFieldMentor,
              "تعهد به کار - منتور": workCommit,
              "سایر ریسک‌ها و محدودیت‌ها - منتور": limitAndRisk,
              "بورسیه دارد؟": scholar ? "بله" : "خیر",
              "درصد بورسیه": scholarPercentage,
              "رشته نهایی": finalField,
              "مسیر آموزشی": careerPathway?.name || "-",
              "تاریخ تایید/رد فرم - پذیرش":
                createdAtAfter &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAtAfter)),
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
            const { regForm, AfterWeekForm, hasLMSUser, actions } =
              seekerStudent;

            const latestActions = actions?.[actions.length - 1];

            return {
              وضعیت: latestActions?.status,
              تاریخ:
                latestActions.date &&
                new Intl.DateTimeFormat("fa").format(
                  new Date(latestActions.date)
                ),
              "نام و نام خانوادگی": regForm.firstName + " " + regForm.family,
              گروه: regForm?.course,
              "کد متقاضی": regForm.registrationCode,
              استان: regForm.province,
              شهر: regForm.city,
              ایمیل: regForm.email,
              "شماره همراه": regForm.mobile,
              "نحوه آشنایی با کاریار": regForm?.familiarity,
              "نام معرف یا موسسه": regForm?.refer,
              "رشته انتخابی": regForm?.selectedField,
              "اکانت ال ام اس": hasLMSUser ? "دارد" : "ندارد",
              "وضعیت شرکت در کارگاه معارفه": AfterWeekForm?.workshopCont,
              "وضعیت حضور و غیاب در کارنامه هفته پذیرش":
                AfterWeekForm?.presentStatus,
              بورسیه: AfterWeekForm?.scholar,
              "رشته نهایی": AfterWeekForm?.finalField,
              "مسیر آموزشی": AfterWeekForm?.careerPathway?.name,
            };
          });
          exportToCSV(seekerObj, fileName);
          break;
        case "studentsAssignee":
          const g = allData.map((i) => {
            const {
              registrationForm: {
                province,
                city,
                family,
                firstName,
                // registrationCode,
                mobile,
                email,
                course,
                birthDate,
                familiarity,
                refer,
                education,
                highSchoolYear,
                uniSemester,
                studyField,
                description,
                // decidedAt,
                // createdAt,
              },
              careerPathway,
              statusForm,
            } = i.student;
            const { assignedMentor, assignedTA, assessment } = i.enrollment;

            const {
              trainingStatus,
              nextTrainingStep,
              referralToFinance,
              kaaryarAssessment,
              description: trainingDescription,
            } = statusForm || {};
            const { name: moduleName } = i.module;
            return {
              "نام و نام خانوادگی": firstName + " " + family,
              استان: province,
              شهر: city,
              گروه: course,
              "سال تولد": birthDate,
              "نحوه آشنایی": familiarity,
              "نام معرف یا موسسه": refer,
              "شماره همراه": mobile,
              ایمیل: email,
              "میزان تحصیلات": education,
              "سال دبیرستان": highSchoolYear,
              "ترم دانشگاه": uniSemester,
              "رشته تحصیلی": studyField,
              "توضیحات سایر": description,
              "حل تمرین": assignedTA
                ? assignedTA.firstName + " " + assignedTA.family
                : "-",
              منتور: assignedMentor
                ? assignedMentor.firstName + " " + assignedMentor.family
                : "-",
              "وضعیت آموزش": trainingStatus.value,
              "قدم آتی آموزش": nextTrainingStep.value,
              "ارجاع به واحد مالی": referralToFinance.value,
              "ارزیابی کاریار": kaaryarAssessment.value,
              "مسیر آموزشی": careerPathway?.name,
              "توضیحات - آموزش": trainingDescription,
              "دوره‌ای که شما منتسب به این مهارت‌آموز بوده‌اید/هستید":
                moduleName,
              "نمره نهایی": assessment?.finalGrade,
              "ارزیابی نهایی": assessment?.finalAssessment,
            };
          });
          console.log(g);
          exportToCSV(g, fileName);
          break;
        case "studentOfAdmin":
          const ad = allData.map((i) => {
            const {
              registrationForm: {
                province,
                city,
                family,
                firstName,
                registrationCode,
                mobile,
                email,
                course,
                birthDate,
                familiarity,
                refer,
                education,
                highSchoolYear,
                uniSemester,
                studyField,
                description,
                decidedAt,
                createdAt,
                selectedField,
              },
              latestEnrolledModule,
              careerPathway,
              currentAssignedTA,
              currentAssignedMentor,
              statusForm,
              coreModulesAsStudent,
            } = i;
            const [firstModule, secondModule, thirdModule, fourthModule] =
              coreModulesAsStudent;
            const {
              trainingStatus,
              nextTrainingStep,
              referralToFinance,
              kaaryarAssessment,
              description: trainingDescription,
              withdrawalReason,
              scholarshipStatus,
            } = statusForm;
            return {
              "نام و نام خانوادگی": firstName + " " + family,
              استان: province,
              شهر: city,
              گروه: course,
              "کد مهارت‌آموز": registrationCode,
              "سال تولد": birthDate,
              "نحوه آشنایی": familiarity,
              "نام معرف یا موسسه": refer,
              "شماره همراه": mobile,
              ایمیل: email,
              "میزان تحصیلات": education,
              "سال دبیرستان": highSchoolYear,
              "ترم دانشگاه": uniSemester,
              "رشته تحصیلی": studyField,
              "توضیحات سایر": description,
              "تاریخ ارسال فرم":
                createdAt &&
                new Intl.DateTimeFormat("fa").format(new Date(createdAt)),
              "تاریخ تایید/رد فرم":
                decidedAt &&
                new Intl.DateTimeFormat("fa").format(new Date(decidedAt)),
              "رشته انتخابی": selectedField,
              "نام اولین دوره آموزشی": firstModule?.name || "",
              "نام دومین دوره آموزشی": secondModule?.name || "",
              "نام سومین دوره آموزشی": thirdModule?.name || "",
              "نام چهارمین دوره آموزشی": fourthModule?.name || "",
              بورسیه: scholarshipStatus ? "دارد" : "ندارد",
              "وضعیت آموزش": trainingStatus?.value,
              "قدم آتی آموزش": nextTrainingStep?.value,
              "دلیل ریزش": withdrawalReason?.value,
              "ارجاع به واحد مالی": referralToFinance?.value,
              "ارزیابی کاریار": kaaryarAssessment?.value,
              "مسیر آموزشی": careerPathway?.name,
              "توضیحات - آموزش": trainingDescription,
              " دوره کنونی / آخرین دوره": latestEnrolledModule?.name,
              "مربی حل تمرین": currentAssignedTA
                ? currentAssignedTA.personnel.firstName +
                  " " +
                  currentAssignedTA.personnel.family
                : "-",
              منتور: currentAssignedMentor
                ? currentAssignedMentor.personnel.firstName +
                  " " +
                  currentAssignedMentor.personnel.family
                : "-",
            };
          });
          console.log(ad);
          exportToCSV(ad, fileName);
          // console.log(d);

          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    exportToCSV(searchData, fileName);
  };

  return (
    <Button
      sx={{ ml: "auto" }}
      color="secondary"
      endIcon={
        loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <FileDownloadIcon size={20} />
        )
      }
      variant="contained"
      onClick={searchData ? handleClick : exportAllFunc}
      disabled={loading}
    >
      خروجی اکسل
    </Button>
  );
};
