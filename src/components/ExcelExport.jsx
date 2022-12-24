import FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const ExcelExport = ({ apiData, fileName, handleClose }) => {
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
    <>
      <ListItemButton
        onClick={() => {
          exportToCSV(apiData, fileName);
          handleClose();
        }}
      >
        <ListItemIcon>
          <FileDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="گرفتن خروجی اکسل" />
      </ListItemButton>
    </>
  );
};
