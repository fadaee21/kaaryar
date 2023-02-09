import FileSaver from "file-saver";
import {utils,write} from "sheetjs-style/xlsx.mini";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const ExcelExport = ({ apiData, fileName }) => {
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

  return (
    <Button
      sx={{ ml: "auto" }}
      color="secondary"
      endIcon={<FileDownloadIcon />}
      variant="contained"
      onClick={() => {
        exportToCSV(apiData, fileName);
      }}
    >
       خروجی اکسل
    </Button>
  );
};
