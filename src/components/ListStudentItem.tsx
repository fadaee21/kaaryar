import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { StudentProp } from "../model";

const ListStudentItem: React.FC<StudentProp> = ({ student }) => {
  const { firstName, lastName } = student;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: "100%", minWidth: 360, bgcolor: "background.paper" }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </>
        }
      >
        <ListItemText primary={firstName + " " + lastName} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText primary="کامنتی وجود ندارد" sx={{ pl: 4 }} />
        </List>
      </Collapse>

      <Divider variant="inset" component="li" />
    </List>
  );
};

export default ListStudentItem;
