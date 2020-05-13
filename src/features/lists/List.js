import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { editList } from "./listsSlice";
import TitleButton from "../../components/ui/TitleButton";
import TextFieldWhite from "../../components/ui/TextFieldWhite";
import { Tasks } from "../tasks/Tasks";

const useStyles = makeStyles((theme) => ({
  exist: {
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },
  listForm: {
    padding: 5,
  },
}));

export function List(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const onValidate = (event) => {
      event.preventDefault();
      if (title.trim() !== "")
      dispatch(editList(title, props.data.id)).then(() => setEdit(false));
      else {
          setEdit(false);
          setTitle(props.data.title);
      }
  };
  return (
    <Paper className={`${classes.exist}`}>
      {!edit ? (
        <TitleButton onClick={() => setEdit(true)} onMouseDown={() => props.setDraggable(true)}  onMouseUp={() => props.setDraggable(false)} fullWidth disableRipple onDragStart={() => console.log("lol")}>{props.data.title}</TitleButton>
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
      <Tasks list={props.data} />
    </Paper>
  );
}
