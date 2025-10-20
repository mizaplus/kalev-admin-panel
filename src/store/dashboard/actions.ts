import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/main";
import { getAuthToken } from "@/lib/auth";
import type { DashboardData } from "@/features/domain/types/dashboard";
import { setData } from "./slice";

export const loadDashboard = createAsyncThunk(
  "dashboard/loadDashboard",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.get("/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAuthToken(),
        },
      });

      dispatch(setData(res.data as DashboardData));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);

export * from "./slice";
