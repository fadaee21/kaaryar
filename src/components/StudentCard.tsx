import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { MoodleUser } from "../model";
import { Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetImage from "../hooks/request/useGetImage";
import { stringAvatar } from "../utils/avatarColor";

export default function StudentCard({
  moodleUser,
}: {
  moodleUser: MoodleUser;
}) {
  const { email, firstName, lastName, username, id, picture } = moodleUser;
  const navigate = useNavigate();
  const { pic, getPicture } = useGetImage(picture);
  React.useEffect(() => {
    if (picture !== null) {
      getPicture();
    }
  }, []);

  return (
    <Card sx={{ minWidth: 345, height: 210 }}>
      <CardHeader
        avatar={
          pic !== null ? (
            <Avatar src={pic} />
          ) : (
            <Avatar {...stringAvatar(lastName)} />
          )
        }
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
