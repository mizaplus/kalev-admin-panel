import { createContext, useContext, useEffect, useState } from "react";
import type { AboutPageData } from "../types/about-types";
import api from "@/lib/api/main";
import { toast } from "sonner";
import { getAuthToken } from "@/lib/auth";

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

const fetchAboutPage = async () => {
  try {
    const res = await api.get("/page/about", {
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAuthToken(),
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching about page data:", error);
    toast.error("Failed to load about page data.");
  }
};

const AboutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchAboutPage();
      setData(result);
    } catch (error) {
      console.error("Error loading about page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AboutContext.Provider value={{ data, loading, reload: loadData }}>
      {children}
    </AboutContext.Provider>
  );
};

export default AboutProvider;
