import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { currentTasks } from "./tasksSlice";
import { NewTask as NewTaskComponent } from "./NewTask";
import { Task } from "./Task";

export function Tasks(props) {
  const tasks = useSelector(currentTasks(props.list.id));
  return (
    <Grid container spacing={1}>
      {tasks.map((task) => (
        <Grid item xs={12}>
          <Task data={task} />
        </Grid>
      ))}
      <Grid item xs={12}>
      <NewTaskComponent list={props.list} />
      </Grid>
    </Grid>
  );
}
