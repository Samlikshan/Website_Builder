import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

interface BuilderState {
  html: string;
  css: string;
}

const initialState: BuilderState = {
  html: "",
  css: "",
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setBuilderContent: (
      state,
      action: PayloadAction<{ html: string; css: string }>
    ) => {
      state.html = action.payload.html;
      state.css = action.payload.css;
    },
    resetBuilderContent: (state) => {
      state.html = "";
      state.css = "";
    },
  },
});

export const { setBuilderContent, resetBuilderContent } = builderSlice.actions;

export default builderSlice.reducer;
