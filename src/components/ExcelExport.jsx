import React from 'react'
import FileSaver from "file-saver"
import * as XLSX from "sheetjs-style";
import { Button } from '@mui/material';
import { Box } from '@mui/system';


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
    <Box sx={{my:3}}>
      <Button variant='contained' color="info"  onClick={(e) => exportToCSV(apiData, fileName)}>گرفتن خروجی اکسل</Button>
    </Box>
  );
};