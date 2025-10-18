import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHomePage } from "@/lib/api/homepage";

export const loadHomepage = createAsyncThunk(
  "homepage/loadHomepage",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchHomePage();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);

export * from "./slice";
