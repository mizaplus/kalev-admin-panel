import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AboutPageData } from "@/features/domain/types/about-types";
import { loadAbout } from "./actions";

export interface AboutState {
  data: AboutPageData | null;
  loading: boolean;
}

const initialState: AboutState = {
  data: null,
  loading: false,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<AboutPageData | null>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadAbout.fulfilled,
        (state, action: PayloadAction<AboutPageData>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(loadAbout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setData, setLoading } = aboutSlice.actions;
export default aboutSlice.reducer;
