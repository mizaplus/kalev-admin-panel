import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setInvolvementData,
  setInvolvementLoading,
  setInvolvementError,
} from "./slice";
import type { GetInvolvedPageData } from "./types";

export const loadInvolvement = createAsyncThunk<
  GetInvolvedPageData,
  void,
  { rejectValue: string }
>("involvement/loadInvolvement", async (_, { rejectWithValue, dispatch }) => {
  dispatch(setInvolvementLoading(true));
  try {
    const res = await fetch("/page/involvement");
    if (!res.ok) throw new Error("Failed to fetch involvement data");
    const data = await res.json();
    dispatch(setInvolvementData(data));
    return data;
  } catch (err: any) {
    dispatch(setInvolvementError(err.message || "Unknown error"));
    return rejectWithValue(err.message || "Unknown error");
  }
});
