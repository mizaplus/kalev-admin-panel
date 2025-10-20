import { createContext, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadDashboard } from "@/store/dashboard/actions";
import type { DashboardData } from "../types/dashboard";
import { Spinner } from "@/components/ui/spinner";

interface DashboardContextProps {
  data: DashboardData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  data: null,
  loading: false,
  reload: async () => {},
});

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
};

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.dashboard.data);
  const loading = useAppSelector((state) => state.dashboard.loading);

  // Mimic reload API from context
  const reload = async () => {
    await dispatch(loadDashboard());
  };

  useEffect(() => {
    dispatch(loadDashboard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading, reload }}>
      {children}
      {loading && !data && (
        <div className="h-[600px] flex items-center justify-center">
          <Spinner />{" "}
        </div>
      )}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
