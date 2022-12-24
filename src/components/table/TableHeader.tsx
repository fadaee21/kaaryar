import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  TableHead,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import WcIcon from "@mui/icons-material/Wc";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React from "react";
import { AfterWeekType, BeforeWeekType, RegistrationForm } from "../../model";
import { ExcelExport } from "../ExcelExport";
import SearchingGender from "../SearchingGender";
import { useLocation } from "react-router-dom";

interface HeaderProp {
  students: RegistrationForm[] | BeforeWeekType[] | AfterWeekType[] | undefined;
  searchingStudent: any;
  setFilterGender: any;
  filterGender: any;
  checkStateIds?: string;
  getApproveMulti?: (
    id: string | undefined,
    approveLink: string
  ) => Promise<void>;
}

const regSearch = "/reg/search";
const afterSearch = "/exam/after/week/search";
const beforeSearch = "/exam/before/week/search";
const regSearchMulti = "/reg/form/multiple/approve/";

const TableHeader = ({
  students,
  searchingStudent,
  setFilterGender,
  filterGender,
  checkStateIds,
  getApproveMulti,
}: HeaderProp) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //find the route then return link for search gender
  const { pathname } = useLocation();
  const apiSearch = () => {
    if (pathname.endsWith("register-form")) {
      return regSearch;
    }
    if (pathname.endsWith("before-week")) {
      return beforeSearch;
    }
    if (pathname.endsWith("after-week")) {
      return afterSearch;
    }
  };

  return (
    <TableHead>
      <StyledTableRow>
        {/* temporary... later  i should remove line 75 and create conditional between checked icon and select */}
        {pathname.endsWith("register-form") && <StyledTableCell />}
        <StyledTableCell align="left">
          <IconButton color="default" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ExcelExport
                  fileName={"Applicant Info"}
                  apiData={
                    !searchingStudent && !filterGender
                      ? students
                      : !searchingStudent && filterGender
                      ? filterGender
                      : [searchingStudent]
                  }
                  handleClose={handleClose}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={handleClose}>
                  <ListItemIcon>
                    <WcIcon />
                  </ListItemIcon>
                  <SearchingGender
                    setFilterGender={setFilterGender}
                    apiSearch={apiSearch}
                  />
                </ListItemButton>
              </ListItem>
              {/* multiple select just for register-form page*/}
              {pathname.endsWith("register-form") && getApproveMulti && (
                <>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        getApproveMulti(checkStateIds, regSearchMulti);
                        handleClose();
                      }}
                      disabled={checkStateIds === ""}
                    >
                      <ListItemIcon>
                        <GroupAddIcon />
                      </ListItemIcon>
                      تایید گروهی
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Popover>
        </StyledTableCell>
        <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
        <StyledTableCell align="center">سال تولد</StyledTableCell>
        <StyledTableCell align="center">جنسیت</StyledTableCell>
        <StyledTableCell align="center">کد متقاضی</StyledTableCell>
        <StyledTableCell align="center">کد ملی</StyledTableCell>
        <StyledTableCell align="center">موبایل</StyledTableCell>
        <StyledTableCell align="center">ایمیل</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
