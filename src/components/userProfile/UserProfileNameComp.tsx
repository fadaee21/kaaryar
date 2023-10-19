import { Box, List, ListItem, ListItemText, Stack } from "@mui/material";
import { EditBooleanSearch } from "../search/SearchSelect";
import { useEffect, useState } from "react";
interface Props {
  firstName: string;
  lastName: string;
  id: number;
  role: string;
  isActive: boolean;
  editMode: boolean;
  setIsActiveEditing: React.Dispatch<React.SetStateAction<ActiveObject>>;
}
type ActiveObject = {
  value: boolean;
  label: string;
} | null;
const UserProfileNameComp = ({
  firstName,
  lastName,
  role,
  isActive,
  editMode,
  setIsActiveEditing,
}: // setIsActiveState,
// isActiveState,
Props) => {
  const [isActiveState, setIsActiveState] = useState<ActiveObject>({
    value: isActive,
    label: isActive ? "فعال" : "غیرفعال",
  });

  useEffect(() => {
    setIsActiveEditing(isActiveState);
  }, [isActiveState, setIsActiveEditing]);

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
          {editMode ? (
            <Box sx={{ width: "15rem" }}>
              <EditBooleanSearch
                handleChange={(e: any) => setIsActiveState(e)}
                placeholder="وضعیت"
                value={isActiveState}
                options={[
                  { value: true, label: "فعال" },
                  { value: false, label: "غیر فعال" },
                ]}
              />
            </Box>
          ) : (
            <ListItemText
              primary="وضعیت "
              secondary={isActive ? "فعال" : "غیرفعال"}
            />
          )}
        </ListItem>
      </List>
    </Stack>
  );
};

export default UserProfileNameComp;
