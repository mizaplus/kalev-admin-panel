import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/main";
import { getAuthToken } from "@/lib/auth";
import type { ProgramsPageData } from "./types";

export const loadPrograms = createAsyncThunk(
  "programs/loadPrograms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/page/programs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAuthToken(),
        },
      });
      return res.data as ProgramsPageData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);

export * from "./slice";
