import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { currentLists } from "./listsSlice";
import { NewList as NewListComponent } from "./NewList";
import { List } from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex"
  },
  list: {
    width: 300,
    float: "left",
    margin: 5
  }
}));

export function Lists() {
  const classes = useStyles();
  const lists = useSelector(currentLists);
  return (
    <div className={classes.root}>
      {lists.map((list) => (
        <div key={list.id} className={classes.list}>
          <List data={list} />
        </div>
      ))}
      <div className={classes.list}>
      <NewListComponent />
      </div>
    </div>
  );
}
