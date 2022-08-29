import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",

  initialState: {
    currentTitle: "",
  },

  reducers: {
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
  },
});

export const selectCurrentTitle = (state) => {
  return state.general.currentTitle;
};

export const { setCurrentTitle } = generalSlice.actions;

export default generalSlice.reducer;
