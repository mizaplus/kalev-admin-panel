import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { HomePageResponse } from "@/lib/api/homepage";

export interface HomepageState {
  data: HomePageResponse | null;
  loading: boolean;
}

const initialState: HomepageState = {
  data: null,
  loading: false,
};

import { loadHomepage } from "./actions";

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<HomePageResponse | null>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHomepage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadHomepage.fulfilled,
        (state, action: PayloadAction<HomePageResponse>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(loadHomepage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setData, setLoading } = homepageSlice.actions;
export default homepageSlice.reducer;
