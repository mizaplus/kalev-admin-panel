import { useState } from "react";
import { getAuthToken } from "./auth";
import { toast } from "sonner";
import api from "./api/main";

export const API_ROOT =
  "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod";

export function useMutations() {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function addData(
    payload: Array<{
      PK: string;
      SK: string;
      details: Record<string, any>;
    }>,
  ) {
    setUpdating(true);
    try {
      await api.post(API_ROOT, payload, {
        headers: {
          Authorization: await getAuthToken(),
        },
      });
      toast.success("Data addition successful");
      return true;
    } catch (error) {
      console.error("Addition failed:", error);
      toast.error("Addition failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  async function updateData(
    payload: Array<{
      PK: string;
      SK: string;
      details: Record<string, any>;
    }>,
  ) {
    setUpdating(true);
    try {
      await api.put(API_ROOT, payload, {
        headers: {
          Authorization: await getAuthToken(),
        },
      });
      toast.success("Data Update successful");
      return true;
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteData(payload: Array<{ PK: string; SK: string }>) {
    setDeleting(true);
    try {
      await api.delete(API_ROOT, {
        data: payload,
        headers: {
          Authorization: await getAuthToken(),
        },
      });
      toast.success("Data deletion successful");
      return true;
    } catch (error) {
      console.error("Deletion failed:", error);
      toast.error("Deletion failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return { updateData, addData, updating, deleteData, deleting };
}
