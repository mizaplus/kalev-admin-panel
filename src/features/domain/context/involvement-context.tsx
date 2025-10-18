// Hooks
import React, { useContext, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Utils
import { loadInvolvement } from "@/store";
import {
  setInvolvementData,
  setInvolvementLoading,
  setInvolvementError,
} from "@/store/involvement/slice";

// Types
import type { GetInvolvedPageData } from "@/store/involvement/types";

interface InvolvementContextValue {
  data: GetInvolvedPageData | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
  updateData: (payload: any) => Promise<any>;
}

const InvolvementContext = React.createContext<
  InvolvementContextValue | undefined
>(undefined);

export const InvolvementProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.involvement);

  const reload = useCallback(() => {
    dispatch(loadInvolvement());
  }, [dispatch]);

  const updateData = useCallback(
    async (payload: any) => {
      dispatch(setInvolvementLoading(true));
      try {
        const res = await fetch("/page/involvement", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update involvement data");
        const updated = await res.json();
        dispatch(setInvolvementData(updated));
        return updated;
      } catch (err: any) {
        dispatch(setInvolvementError(err.message || "Unknown error"));
        return null;
      }
    },
    [dispatch],
  );

  const value = useMemo(
    () => ({ data, loading, error, reload, updateData }),
    [data, loading, error, reload, updateData],
  );

  return (
    <InvolvementContext.Provider value={value}>
      {children}
    </InvolvementContext.Provider>
  );
};

export function useInvolvementContext() {
  const ctx = useContext(InvolvementContext);
  if (!ctx)
    throw new Error(
      "useInvolvementContext must be used within InvolvementProvider",
    );
  return ctx;
}
