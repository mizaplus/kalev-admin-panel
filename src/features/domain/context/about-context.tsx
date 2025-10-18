import { createContext, useContext, useEffect } from "react";
import type { AboutPageData } from "../types/about-types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadAbout } from "@/store/about/actions";

interface AboutContextProps {
  data: AboutPageData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export const AboutContext = createContext<AboutContextProps>({
  data: null,
  loading: false,
  reload: async () => {},
});

export const useAboutContext = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAboutContext must be used within an AboutProvider");
  }
  return context;
};

const AboutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.about.data);
  const loading = useAppSelector((state) => state.about.loading);

  // Mimic reload API from context
  const reload = async () => {
    await dispatch(loadAbout());
  };

  useEffect(() => {
    dispatch(loadAbout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AboutContext.Provider value={{ data, loading, reload }}>
      {children}
    </AboutContext.Provider>
  );
};

export default AboutProvider;
