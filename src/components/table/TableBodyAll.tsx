import { Checkbox, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

interface TBodyType extends TableBodyAllType {
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
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
          <Checkbox
            size="small"
            onChange={(e) => handleCheckBox(e, id.toString())}
          />
        </StyledTableCell>
      )}

      <StyledTableCell
        align="left"
        sx={{ width: "23%", verticalAlign: "center", cursor: "pointer" }}
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
      <StyledTableCell
        align="left"
        sx={{ width: "2%", verticalAlign: "center" }}
      >
        <Typography variant="body1">
          {checked === true
            ? `تایید شده`
            : checked === null
            ? `در انتظار تایید`
            : `تایید نشده`}
        </Typography>
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
