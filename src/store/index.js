import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./slices/topicSlice";
import progressReducer from "./slices/progressSlice";

const store = configureStore({
  reducer: {
    topic: topicReducer,
    progress: progressReducer,
  },
});

export default store;
