import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/main";
import { getAuthToken } from "@/lib/auth";
import type { AboutPageData } from "@/features/domain/types/about-types";

export const loadAbout = createAsyncThunk(
  "about/loadAbout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/page/about", {
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAuthToken(),
        },
      });
      return res.data as AboutPageData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);

export * from "./slice";
