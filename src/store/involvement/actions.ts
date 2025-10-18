import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setInvolvementData,
  setInvolvementLoading,
  setInvolvementError,
} from "./slice";
import type { GetInvolvedPageData } from "./types";
import api from "@/lib/api/main";
import { getAuthToken } from "@/lib/auth";

export const loadInvolvement = createAsyncThunk<
  GetInvolvedPageData,
  void,
  { rejectValue: string }
>("involvement/loadInvolvement", async (_, { rejectWithValue, dispatch }) => {
  dispatch(setInvolvementLoading(true));
  try {
    const res = await api.get("/page/involvement", {
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAuthToken(),
      },
    });
    const data = res.data;
    dispatch(setInvolvementData(data));
    return data;
  } catch (err: any) {
    dispatch(setInvolvementError(err.message || "Unknown error"));
    return rejectWithValue(err.message || "Unknown error");
  }
});
