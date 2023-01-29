import { Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { arrayArranger } from "../../utils/moodleDetailIterator";

const StudentDetailMore = ({ studentDetail }: any) => {
  //studentDetail is really shit array,first off arrange to regular object then get key value for mapping dynamically
  const studentDetailArr = arrayArranger(studentDetail);
  const keyArrayOfObject = Object.keys(studentDetailArr);

  return (
    <Grid container>
      {keyArrayOfObject?.map((item: string, i: React.Key) => {
        return (
          <Grid item key={i} xs={12} sm={4} md={3}>
            <List>
              <ListItem>
                <ListItemText
                  primary={item}
                  secondary={studentDetailArr[item]}
                />
              </ListItem>
            </List>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StudentDetailMore;
