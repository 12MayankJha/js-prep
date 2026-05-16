import { createSlice } from "@reduxjs/toolkit";

const load = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    bookmarks: {
      js: load("js-prep-bm"),
      react: load("react-prep-bm"),
    },
    viewed: {
      js: load("js-prep-viewed"),
      react: load("react-prep-viewed"),
    },
    opened: {
      js: [],
      react: [],
    },
  },
  reducers: {
    toggleBookmark(state, action) {
      const { topic, uid } = action.payload;
      const list = state.bookmarks[topic];
      const idx = list.indexOf(uid);
      if (idx === -1) list.push(uid);
      else list.splice(idx, 1);
      localStorage.setItem(`${topic}-prep-bm`, JSON.stringify(list));
    },
    toggleViewed(state, action) {
      const { topic, uid } = action.payload;
      const list = state.viewed[topic];
      const idx = list.indexOf(uid);
      if (idx === -1) list.push(uid);
      else list.splice(idx, 1);
      localStorage.setItem(`${topic}-prep-viewed`, JSON.stringify(list));
    },
    toggleOpened(state, action) {
      const { topic, uid } = action.payload;
      const list = state.opened[topic];
      const idx = list.indexOf(uid);
      if (idx === -1) list.push(uid);
      else list.splice(idx, 1);
    },
    resetProgress(state, action) {
      const topic = action.payload;
      state.viewed[topic] = [];
      localStorage.setItem(`${topic}-prep-viewed`, JSON.stringify([]));
    },
  },
});

export const { toggleBookmark, toggleViewed, toggleOpened, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
