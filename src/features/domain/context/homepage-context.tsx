import { type HomePageResponse } from "@/lib/api/homepage";
import { createContext, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadHomepage } from "@/store/homepage/actions";

interface HomepageContextProps {
  data: HomePageResponse | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export const HomepageContext = createContext<HomepageContextProps>({
  data: null,
  loading: false,
  reload: async () => {},
});

export const useHomepageContext = () => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error(
      "useHomepageContext must be used within a HomepageProvider",
    );
  }
  return context;
};

const HomepageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.homepage.data);
  const loading = useAppSelector((state) => state.homepage.loading);

  // Mimic reload API from context
  const reload = async () => {
    await dispatch(loadHomepage());
  };

  useEffect(() => {
    dispatch(loadHomepage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomepageContext.Provider value={{ data, loading, reload }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
