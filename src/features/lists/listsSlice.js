import { createSlice } from "@reduxjs/toolkit";
let id = 1;
export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    elements: [],
  },
  reducers: {
    add: (state, {payload}) => {
      state.elements.push({id: id++, title: payload.title});
    },
    edit: (state, {payload}) => {
      console.log(payload.id)
      console.log(state.elements.find(element => element.id === payload.id))
      let element = state.elements.find(element => element.id === payload.id)
      element.title = payload.title;
    }
  },
});

export const { add, edit } = listsSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addList = title => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(add({title}));
    resolve();
  });
};

export const editList = (title, id) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(edit({title, id}));
    resolve();
  });
};
export const currentLists = (state) => state.lists.elements;

export default listsSlice.reducer;
