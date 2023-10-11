import { List, ListItem, ListItemText, Stack } from "@mui/material";
interface Props {
  firstName: string;
  lastName: string;
  id: number;
  role: string;
  isActive: boolean;
}
const UserProfileNameComp = ({ firstName, lastName, role, isActive }: Props) => {
  return (
    <Stack direction="row" spacing={20}>
      <List>
        <ListItem>
          <ListItemText primary="نام " secondary={firstName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="نقش" secondary={role} />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemText primary="نام خانوادگی " secondary={lastName} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="وضعیت "
            secondary={isActive ? "فعال" : "غیرفعال"}
          />
        </ListItem>
      </List>
    </Stack>
  );
};

export default UserProfileNameComp;
