import { Checkbox, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

interface TBodyType extends TableBodyAllType {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  resultStatus?: string;
  checkBoxDisplay?: boolean;
}

const TableBodyAll = ({
  id,
  birthDate,
  family,
  firstName,
  registrationCode,
  codeMeli,
  mobile,
  email,
  roles,
  directNav,
  gender,
  checked,
  handleCheckBox,
  checkBoxDisplay,
  resultStatus,
}: TBodyType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* checkbox only show in registration table */}
      {pathname.endsWith("register-form") && handleCheckBox && (
        <StyledTableCell
          align="left"
          sx={{ width: "2%", verticalAlign: "center" }}
        >
          {/* show check box only if search for null */}
          {checked === null && checkBoxDisplay && (
            <Checkbox
              size="small"
              onChange={(e) => handleCheckBox(e, id.toString())}
            />
          )}
        </StyledTableCell>
      )}
      <StyledTableCell
        align="left"
        sx={{ width: "10%", verticalAlign: "center" }}
      >
        {/* if (skill-seeker page show  8 status type) else (show 3 status) */}
        {pathname.endsWith("skill-seeker") ? (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            {resultStatus}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              borderRadius: "5px",
              boxShadow: "0px 1px 2.5px",
              ...(checked === true
                ? { backgroundColor: "#64dd1720" }
                : checked === null
                ? { backgroundColor: "#ffab0045" }
                : { backgroundColor: "#ff174420" }),
            }}
          >
            {checked === true
              ? `تایید شده`
              : checked === null
              ? `در انتظار تایید`
              : `رد شده`}
          </Typography>
        )}
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "15%", verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
      >
        <Typography variant="body1">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{birthDate}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "5%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{gender}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{codeMeli}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{mobile}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="right"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{email}</Typography>
      </StyledTableCell>

      {/* <StyledTableCell
      align="left"
      sx={{ width: "30%", verticalAlign: "center" }}
    >
      <ListItem sx={{ pt: 0 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigate(`/${roles}/before-week/${id}`)
          }
          sx={{ ml: "auto", mr: "auto" }}
        >
          جزییات
        </Button>
      </ListItem>
    </StyledTableCell> */}
    </StyledTableRow>
  );
};

export default TableBodyAll;
