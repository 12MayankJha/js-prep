import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    activeTopic: "js",
    activeCategory: "fundamentals",
    activeLevel: "all",
    searchQuery: "",
  },
  reducers: {
    setActiveTopic(state, action) {
      state.activeTopic = action.payload;
      state.activeCategory = action.payload === "js" ? "fundamentals" : "core";
      state.activeLevel = "all";
      state.searchQuery = "";
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      state.searchQuery = "";
      state.activeLevel = "all";
    },
    setActiveLevel(state, action) {
      state.activeLevel = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setActiveTopic,
  setActiveCategory,
  setActiveLevel,
  setSearchQuery,
} = topicSlice.actions;

export default topicSlice.reducer;
