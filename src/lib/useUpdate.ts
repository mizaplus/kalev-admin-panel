import { useState } from "react";
import { getAuthToken } from "./auth";
import { toast } from "sonner";

const API_ROOT = "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod";

export function useUpdate() {
  const [updating, setUpdating] = useState(false);

  async function updateData(
    payload: Array<{
      PK: string;
      SK: string;
      details: Record<string, any>;
    }>,
  ) {
    setUpdating(true);
    try {
      const token = await getAuthToken();

      const response = await fetch(API_ROOT, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      toast.success("Data Update successful");
      return true;
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  return { updateData, updating };
}
