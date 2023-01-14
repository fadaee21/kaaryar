import FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
    <Button
      color="secondary"
      endIcon={<FileDownloadIcon />}
      variant="contained"
      onClick={() => {
        exportToCSV(apiData, fileName);
      }}
    >
      گرفتن خروجی اکسل
    </Button>
  );
};
