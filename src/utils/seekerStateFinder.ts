export function seekerStateFinder(
  afterWeekChecked: boolean | null,
  beforeWeekChecked: boolean | null | undefined,
  regChecked: boolean | null | undefined
) {
  let statusSeeker = "";
  if (regChecked === null) {
    statusSeeker = "در انتظار تایید ثبت نام";
  } else if (regChecked === false) {
    statusSeeker = "رد شده در ثبت نام";
  } else if (beforeWeekChecked === null && regChecked === true) {
    statusSeeker = "در انتظار تایید ارزیابی";
  } else if (beforeWeekChecked === false) {
    statusSeeker = "رد شده در ارزیابی";
  } else if (afterWeekChecked === null && beforeWeekChecked === true) {
    statusSeeker = "در انتظار تایید هفته پذیرش";
  } else if (afterWeekChecked === false) {
    statusSeeker = "رد شده در هفته پذیرش";
  } else if (afterWeekChecked === true) {
    statusSeeker = "تایید شده در هفته پذیرش";
  }

  return statusSeeker;
}

//   const allStatusSeeker = obj.map((e: any) => {
//     let allStatus: any = {};
//     allStatus["id"] = e.id;
//     allStatus["regChecked"] = e.regChecked;
//     allStatus["beforeWeekChecked"] = e.beforeWeekChecked;
//     allStatus["afterWeekChecked"] = e.afterWeekChecked;
//     return allStatus;
//   });
