import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProgramsPageData } from "./types";
import { loadPrograms } from "./actions";

export interface ProgramsState {
  data: ProgramsPageData | null;
  loading: boolean;
}

const initialState: ProgramsState = {
  data: null,
  loading: false,
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ProgramsPageData | null>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadPrograms.fulfilled,
        (state, action: PayloadAction<ProgramsPageData>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(loadPrograms.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setData, setLoading } = programsSlice.actions;
export default programsSlice.reducer;
