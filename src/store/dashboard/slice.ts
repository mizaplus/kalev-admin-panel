import type { DashboardData } from "@/features/domain/types/dashboard";
import { createSlice } from "@reduxjs/toolkit";
import { loadDashboard } from "./actions";

interface DashboardState {
  loading: boolean;
  data: DashboardData | null;
  error: string | null;
}

const initialState: DashboardState = {
  loading: false,
  data: null,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadDashboard.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loadDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
