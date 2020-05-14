import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { editTask } from "./tasksSlice";
import TitleButton from "../../components/ui/TitleButton";
import TextFieldWhite from "../../components/ui/TextFieldWhite";
const useStyles = makeStyles((theme) => ({
  exist: {
    color: theme.palette.text.primary,
    background: "white",
    display: "block",
  },
  listForm: {
    padding: 5,
  },
  firstLineTarget: {
    width: "95%",
    height: "1.75rem",
    position: "absolute"
  },
}));

export function Task(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const onValidate = (event) => {
    event.preventDefault();
    if (title.trim() !== "")
      dispatch(editTask(title, props.list, props.data.id)).then(() =>
        setEdit(false)
      );
    else {
      setEdit(false);
      setTitle(props.data.title);
    }
  };
  return (
    <Paper
      className={`${classes.exist}`}
      onDrag={props.onDrag}
      draggable={draggable}
      onDragEnd={props.onDragEnd}
    >
      {!edit ? (
        <TitleButton
          onClick={() => setEdit(true)}
          onMouseDown={() => setDraggable(true)}
          onMouseUp={() => setDraggable(false)}
          fullWidth
          disableRipple
        >
          <span
            className={classes.firstLineTarget}
            onDragOver={props.onDragOver}
          ></span>
          {props.data.title}
        </TitleButton>
      ) : (
        <form onSubmit={onValidate}>
          <TitleButton fullWidth disableRipple>
            <TextFieldWhite
              autoFocus
              onBlur={onValidate}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onSubmit={onValidate}
            />
          </TitleButton>
        </form>
      )}
    </Paper>
  );
}
