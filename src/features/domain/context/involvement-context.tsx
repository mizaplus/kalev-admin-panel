// Hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useCallback, useContext, useEffect, useMemo } from "react";

// Utils

// Types
import type { GetInvolvedPageData } from "@/store/involvement/types";
import { loadInvolvement } from "@/store/involvement/actions";

interface InvolvementContextValue {
  data: GetInvolvedPageData | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
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

  useEffect(() => {
    dispatch(loadInvolvement());
  }, [dispatch]);

  const value = useMemo(
    () => ({ data, loading, error, reload }),
    [data, loading, error, reload],
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
