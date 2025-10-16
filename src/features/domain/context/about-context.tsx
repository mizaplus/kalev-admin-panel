import { createContext, use, useEffect, useState } from "react";
import type { AboutPageData } from "./about-types";

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
  const context = use(AboutContext);
  if (!context) {
    throw new Error("useAboutContext must be used within an AboutProvider");
  }
  return context;
};

const fetchAboutPage = async (): Promise<AboutPageData> => {
  // TODO: Replace with real API call
  // This is a placeholder for the structure you provided
  return {
    hero: {
      image: "public/hero.jpg",
      tagline: "Learn More",
      title: "About us",
      key: { SK: "HERO", PK: "ABOUT" },
    },
    story: {
      title: "Our Story",
      content: "...",
      key: { SK: "STORY", PK: "ABOUT" },
    },
    info: {
      mission_vision: {
        vision: "To give hope and support ...",
        mission: "Our mission is to ...",
        key: { SK: "MISSION_VISION", PK: "ABOUT" },
      },
      objectives: {
        content: "## Our Objectives\n...",
        key: { SK: "OBJECTIVES", PK: "ABOUT" },
      },
    },
    team: {
      director: {
        name: "Mrs. Shareen Nahurira Muhumuza",
        image: "public/user.png",
        content: "Welcome to Kalev Child Care Foundation...",
        key: { SK: "TEAM#DIRECTOR", PK: "ABOUT" },
      },
      members: [
        {
          name: "Mr. Ivan Muhumuza",
          image: "public/user.png",
          role: "Director",
          key: { SK: "TEAM#MEMBER#1", PK: "ABOUT" },
        },
      ],
    },
  };
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
