import { createSlice } from "@reduxjs/toolkit";

let id = 1;
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    elements: [],
    dragged: null
  },
  reducers: {
    add: (state, {payload}) => {
      state.elements.push({id: id++, title: payload.title, list_id: payload.list.id, order: state.elements.filter(element => element.list_id === payload.list.id).length});
    },
    edit: (state, {payload}) => {
      let element = state.elements.find(element => element.id === payload.id)
      element.title = payload.title;
    },
    setDragged: (state, {payload}) => {
      state.dragged = payload.task;
    },
    changeOrder: (state, {payload}) => {
      const elementA = state.elements.find(element => element.id === payload.idA)
      const elementB = state.elements.find(element => element.id === payload.idB)
      const orderA = elementA.order;
      const orderB = elementB.order;
      if (elementA.list_id !== elementB.list_id) {
        const previousListId = elementA.list_id;
        elementA.list_id = elementB.list_id;
        elementA.order = orderB;
        state.elements.filter(element => element.list_id === previousListId).forEach(element => {
          if (element.order > orderA)
          element.order--;
        });
        state.elements.filter(element => element.list_id === elementA.list_id).forEach(element => {
          if (element.order >= orderB)
          element.order++;
        });
        elementA.order = orderB;
      }
      else {
        elementA.order = orderB;
        elementB.order = orderA;
      }

    },
    addToList: (state, {payload}) => {
      const element = state.elements.find(element => element.id === payload.id)
      element.list_id = payload.list_id;
      element.order = 0;
    }
  },
});

export const { add, edit, changeOrder, setDragged, addToList } = tasksSlice.actions;
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

export const changeTaskOrder = (idA, idB) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(changeOrder({idA, idB}));
    resolve();
  });
};
export const currentTasks = (list_id) => (state) => state.tasks.elements.filter(task => task.list_id === list_id).slice().sort((a,b) => (a.order > b.order ? 1 : -1));

export const currentDragged = (state) => state.tasks.dragged;

export default tasksSlice.reducer;
