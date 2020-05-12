import React from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    border: "1px solid green",
    fontSize: "1rem"
  },
}));

function TextFieldWhite(props) {
  const classes = useStyles();
  return (
    <InputBase
      autoFocus={props.autoFocus}
      onBlur={props.onBlur}
      value={props.value}
      onChange={props.onChange}
      placeholder="List title"
      margin="dense"
      variant="outlined"
      multiline={true}
      className={classes.root}
      fullWidth
      size="small"
      onKeyPress={(event) => event.key === "Enter" && props.onSubmit(event)}
    />
  );
}

export default TextFieldWhite;
