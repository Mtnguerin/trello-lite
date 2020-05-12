import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "../features/lists/listsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export default configureStore({
  reducer: {
    lists: listsReducer,
    tasks: tasksReducer
  },
});
