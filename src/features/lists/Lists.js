import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { currentLists } from "./listsSlice";
import { NewList as NewListComponent } from "./NewList";
import { List } from "./List";
import { changeListOrder } from "./listsSlice";
import { setDragged } from "../tasks/tasksSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    height: "100vh",
  },
  list: {
    width: 300,
    float: "left",
    margin: 5,
  },
}));

export function Lists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lists = useSelector(currentLists);
  const [drag, setDrag] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [isChangingOrder, setIsChangingOrder] = useState(false);
  const onDragOver = (list) => {
    if (list && drag && list.id !== drag.id && !isChangingOrder) {
      setIsChangingOrder(true);
      dispatch(changeListOrder(drag.id, list.id)).then(() =>
        setIsChangingOrder(false)
      );
    }
  };
  const onDragEnd = (event) => {
    setDraggable(false);
    setDrag(null);
  };
  const onDrag = (list, event) => {
    if (draggable && list !== drag) {
      setDrag(list);
    }
  };
  const onDrop = () => {
    dispatch(setDragged({ task: null }));
  };
  return (
    <div
      onDragOver={(ev) => {ev.preventDefault()}}
      onDrop={onDrop}
      className={classes.root}
    >
      {lists.map((list) => (
        <div
          key={list.id}
          className={classes.list}
          style={{ visibility: drag === list ? "hidden" : "visible" }}
        >
          <List
            data={list}
            draggable={draggable}
            setDraggable={setDraggable}
            onDrag={(event) => onDrag(list, event)}
            onDragEnd={onDragEnd}
            onDragOver={() => onDragOver(list)}
          />
        </div>
      ))}
      <div className={classes.list}>
        <NewListComponent />
      </div>
    </div>
  );
}
