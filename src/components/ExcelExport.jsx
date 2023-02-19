import FileSaver from "file-saver";
import { utils, write } from "sheetjs-style/xlsx.mini";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { getData } from "../api/axios";

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
          exportToCSV(allData, fileName);
          break;
        case "before":
          const a = allData.map((i) => i.registrationForm);
          exportToCSV(a, fileName);
          break;
        case "after":
          const b = allData.map((i) => i.beforeWeekForm?.registrationForm);
          exportToCSV(b, fileName);
          break;
        case "seeker":
          const c = allData.map(
            (i) =>
              i.beforeWeekForm?.registrationForm !== undefined &&
              i.beforeWeekForm?.registrationForm
          );
          //TODO:there is a lot of undefined objects it cause error, after removing these objects remove this condition
          exportToCSV(c, fileName);
          break;
        case "studentListMoodleTable":
          exportToCSV(allData, fileName);
          break;
        case "studentOfAdmin":
          const d = allData.map((i) => i.moodleUser);
          exportToCSV(d, fileName);
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
