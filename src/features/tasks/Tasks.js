import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { currentTasks, currentDragged } from "./tasksSlice";
import { NewTask as NewTaskComponent } from "./NewTask";
import { Task } from "./Task";
import { changeTaskOrder, setDragged } from "./tasksSlice";

export function Tasks(props) {
  const tasks = useSelector(currentTasks(props.list.id));
  const dragged = useSelector(currentDragged);
  const dispatch = useDispatch();
  const [isChangingOrder, setIsChangingOrder] = useState(false);
  const onDragOver = (task, event) => {
    event.preventDefault();
    if (dragged && task && dragged.id !== task.id && !isChangingOrder) {
      setIsChangingOrder(true);
      dispatch(changeTaskOrder(dragged.id, task.id)).then(() => {
        setIsChangingOrder(false);
      });
    }
  };
  const onDrag = (task) => {
    if (task !== dragged) dispatch(setDragged({ task }));
  };
  const onDragEnd = (event) => {
    event.preventDefault();
    dispatch(setDragged({ task: null }));
  };
  return (
    <Grid container spacing={1}>
      {tasks.map((task) => (
        <Grid
          key={task.id}
          style={{
            visibility:
              dragged && dragged.id === task.id ? "hidden" : "visible",
          }}
          item
          xs={12}
        >
          <Task
            data={task}
            onDrag={(event) => onDrag(task)}
            draggable
            onDragOver={(event) => onDragOver(task, event)}
            onDragEnd={onDragEnd}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <NewTaskComponent list={props.list} />
      </Grid>
    </Grid>
  );
}
