import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";
interface ComponentReducerState {
  mode: PaletteMode;
  isNavOpen: boolean;
}

const initialState: ComponentReducerState = {
  mode: "dark",
  isNavOpen: false,
};

const ComponentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setMod: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
    openNav: (state) => {
      state.isNavOpen = true;
    },
    closeNav: (state) => {
      state.isNavOpen = false;
    },
  },
});

export const ComponentActions = ComponentSlice.actions;
export default ComponentSlice;
