import { Avatar, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Link } from "react-router-dom";
import useGetImage from "../../hooks/request/useGetImage";
import { useEffect } from "react";
import { Picture } from "../../model";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  id: number;
  counter: number;
  picture: Picture | undefined;
  isActive: boolean;
}

const TableBodyVolunteer = ({
  username,
  firstName,
  lastName,
  role,
  counter,
  picture,
  isActive,
}: Props) => {
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  useEffect(() => {
    picture && getPicture(picture.file_hash);
  }, [getPicture, picture]);

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
        width={"5%"}
      >
        <Typography variant="body2">{counter}</Typography>
      </StyledTableCell>
      <StyledTableCell
        width={"5%"}
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Avatar sx={{ width: 40, height: 40 }} src={pic} />
      </StyledTableCell>
      <StyledTableCell
        width={"40%"}
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          <Link to={`${username}`}>{`${firstName} ${lastName}`}</Link>
        </Typography>
      </StyledTableCell>

      <StyledTableCell
        width={"20%"}
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{role}</Typography>
      </StyledTableCell>
      <StyledTableCell
        width={"30%"}
        align="center"
        sx={{ verticalAlign: "center" }}
      >
        {isActive ? "فعال" : "غیرفعال"}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVolunteer;
