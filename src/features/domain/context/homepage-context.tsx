import { fetchHomePage, type HomePageResponse } from "@/lib/api/homepage";
import { createContext, useContext, useEffect, useState } from "react";

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

const HomepageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, setData] = useState<HomePageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const result = await fetchHomePage();
      setData(result);
    } catch (error) {
      console.error("Error loading homepage data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <HomepageContext.Provider value={{ data, loading, reload: loadData }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
