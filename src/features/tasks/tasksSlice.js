import { createSlice } from "@reduxjs/toolkit";
let id = 1;
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    elements: [],
  },
  reducers: {
    add: (state, {payload}) => {
      state.elements.push({id: id++, title: payload.title, list_id: payload.list.id});
    },
    edit: (state, {payload}) => {
      let element = state.elements.find(element => element.id === payload.id)
      element.title = payload.title;
    }
  },
});

export const { add, edit } = tasksSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addTask = (title, list) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(add({title, list}));
    resolve();
  });
};

export const editTask = (title, list, id) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(edit({title, list, id}));
    resolve();
  });
};
export const currentTasks = (list_id) => (state) => state.tasks.elements.filter(task => task.list_id === list_id);

export default tasksSlice.reducer;
