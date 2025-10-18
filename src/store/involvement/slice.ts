import { createSlice } from "@reduxjs/toolkit";
import { type GetInvolvedPageData } from "./types";

interface InvolvementState {
  data: GetInvolvedPageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: InvolvementState = {
  data: null,
  loading: false,
  error: null,
};

const involvementSlice = createSlice({
  name: "involvement",
  initialState,
  reducers: {
    setInvolvementData(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setInvolvementLoading(state, action) {
      state.loading = action.payload;
    },
    setInvolvementError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearInvolvement(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setInvolvementData,
  setInvolvementLoading,
  setInvolvementError,
  clearInvolvement,
} = involvementSlice.actions;

export default involvementSlice.reducer;
