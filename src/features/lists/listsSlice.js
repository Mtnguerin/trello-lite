import { createSlice } from "@reduxjs/toolkit";
let id = 1;
export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    elements: [],
  },
  reducers: {
    add: (state, {payload}) => {
      state.elements.push({id: id++, title: payload.title, order: state.elements.length});
    },
    edit: (state, {payload}) => {
      let element = state.elements.find(element => element.id === payload.id)
      element.title = payload.title;
    },
    changeOrder: (state, {payload}) => {
      let elementA = state.elements.find(element => element.id === payload.idA)
      let elementB = state.elements.find(element => element.id === payload.idB)
      let orderA = elementA.order;
      let orderB = elementB.order;
      elementA.order = orderB;
      elementB.order = orderA;
    }
  },
});

export const { add, edit, changeOrder } = listsSlice.actions;
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

export const changeListOrder = (idA, idB) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(changeOrder({idA, idB}));
    resolve();
  });
};
export const currentLists = (state) => state.lists.elements.slice().sort((a,b) => (a.order > b.order ? 1 : -1));

export default listsSlice.reducer;
