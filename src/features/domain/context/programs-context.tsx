import { createContext, useContext, useEffect } from "react";
import type { ProgramsPageData } from "@/store/programs/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPrograms } from "@/store/programs/actions";

interface ProgramsContextProps {
  data: ProgramsPageData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export const ProgramsContext = createContext<ProgramsContextProps>({
  data: null,
  loading: false,
  reload: async () => {},
});

export const useProgramsContext = () => {
  const context = useContext(ProgramsContext);
  if (!context) {
    throw new Error(
      "useProgramsContext must be used within a ProgramsProvider",
    );
  }
  return context;
};

const ProgramsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.programs.data);
  const loading = useAppSelector((state) => state.programs.loading);

  const reload = async () => {
    await dispatch(loadPrograms());
  };

  useEffect(() => {
    dispatch(loadPrograms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgramsContext.Provider value={{ data, loading, reload }}>
      {children}
    </ProgramsContext.Provider>
  );
};

export default ProgramsProvider;
