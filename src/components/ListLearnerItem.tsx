import React, { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { learnerProp } from "../model";
import { useGetComments } from "../hooks/useGetComments";

const ListLearnerItem: React.FC<learnerProp> = ({ learner }) => {
  const { firstName, lastName } = learner;
  const [open, setOpen] = useState(false);
  const { comments, getListLearner, loading } = useGetComments();

  const handleClick = () => {
    getListLearner();
    setTimeout(() => {
      setOpen(!open);
    }, 300);
  };
  const handleComment = () => {
    console.log("comment");
  };
  const handleDelete = (id: string) => {
    console.log(id);
  };
  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <List sx={{ width: "100%", minWidth: 360, bgcolor: "background.paper" }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <ListItemIcon>
            <IconButton onClick={handleComment}>
              <CommentIcon />
            </IconButton>
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItemIcon>
        }
      >
        <ListItemText primary={firstName + " " + lastName} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {loading ? (
            <ListItemText primary="کامنتی وجود ندارد" sx={{ pl: 4 }} />
          ) : (
            comments.map((item: any) => {
              const { id, comment } = item;
              return (
                <ListItemButton sx={{ pl: 4 }} key={id}>
                  <ListItemText primary={comment} />
                  <IconButton onClick={() => handleDelete(id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </ListItemButton>
              );
            })
          )}
        </List>
      </Collapse>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default ListLearnerItem;
