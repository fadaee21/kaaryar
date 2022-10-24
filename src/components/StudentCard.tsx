import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { MoodleUser } from "../model";
import { Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

export default function StudentCard({
  moodleUser,
  id,
}: {
  moodleUser: MoodleUser;
  id: number;
}) {
  const { email, firstName, lastName, username } = moodleUser;
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 345, height: 210 }}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(lastName)} />}
        title={firstName + " " + lastName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign={"end"}>
          email: {email}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"end"}>
          username: {username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`${id}`)}>
          مشاهده{" "}
        </Button>
        <Button size="small">ویرایش </Button>
      </CardActions>
    </Card>
  );
}
