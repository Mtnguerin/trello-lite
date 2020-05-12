import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, Button, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Clear } from "@material-ui/icons";
import { addList } from "./listsSlice";
import SuccessButton from "../../components/ui/SuccessButton";
import TitleButton from "../../components/ui/TitleButton";
import TextFieldWhite from "../../components/ui/TextFieldWhite";

const useStyles = makeStyles((theme) => ({
  exist: {
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },
  new: {
    color: "white",
    padding: 0,
    background: "rgba(255,255,255,0.5)",
  },
  cancelButton: {
    padding: theme.spacing(1),
  },
  listForm: {
    padding: 5,
  },
}));

export function NewList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);
  const onPaperClick = (e) => {
    if (title == null) {
      setTitle("");
    }
  };
  const add = (event) => {
    event.preventDefault();
    if (title.trim() !== "")
      dispatch(addList(title)).then(() => setTitle(null));
  };
  return (
    <Paper
      className={title != null ? `${classes.exist}` : `${classes.new}`}
      onClick={onPaperClick}
    >
      <Collapse in={title != null}>
        <form
          className={classes.listForm}
          noValidate
          autoComplete="off"
          onSubmit={add}
        >
          {title != null && (
            <TitleButton fullWidth disableRipple>
            <TextFieldWhite
              autoFocus
              value={title ? title : ""}
              onChange={(e) => setTitle(e.target.value)}
              onSubmit={add}
            />
            </TitleButton>
          )}
          <Grid container spacing={1}>
            <Grid item xs>
              <SuccessButton onClick={add} fullWidth>
                Add a list
              </SuccessButton>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => setTitle(null)}
                className={`${classes.cancelButton}`}
              >
                <Clear />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
      <Collapse in={title == null}>
        <TitleButton fullWidth>
          <Add fontSize="small" /> Add a new list
        </TitleButton>
      </Collapse>
    </Paper>
  );
}
