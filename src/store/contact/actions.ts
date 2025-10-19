import api from "@/lib/api/main";
import { setContactData, setContactLoading, setContactError } from "./slice";
import type { AppDispatch } from "@/store";
import { getAuthToken } from "@/lib/auth";

export const fetchContactData = () => async (dispatch: AppDispatch) => {
  dispatch(setContactLoading(true));
  try {
    const res = await api.get("/page/contact", {
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAuthToken(),
      },
    });

    dispatch(setContactData(res.data));
  } catch (err: any) {
    dispatch(setContactError(err.message || "Unknown error"));
  }
};
