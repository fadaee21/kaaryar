import FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";
import { ListItemText } from "@mui/material";

export const ExcelExport = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <ListItemText
      onClick={(e) => exportToCSV(apiData, fileName)}
      primary="گرفتن خروجی اکسل"
    />
  );
};
