const HOME_PAGE_ENDPOINT =
  "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod/page/home";

import { getAuthToken } from "@/lib/auth";

export type HomePageHero = {
  title: string;
  tagline: string;
  image: string;
};

export type HomePageAbout = {
  title: string;
  image: string;
  content: string;
};

export type HomePageReason = {
  icon: string;
  description: string;
  disabled: boolean;
  title: string;
};

export type HomePageChooseUs = {
  title: string;
  description: string;
  reasons: HomePageReason[];
};

export type HomePageProgram = {
  description: string;
  image: string;
  title: string;
  slug: string;
};

export type HomePagePrograms = {
  title: string;
  description: string;
  items: HomePageProgram[];
};

export type HomePageResponse = {
  hero: HomePageHero;
  about: HomePageAbout;
  choose_us: HomePageChooseUs;
  programs: HomePagePrograms;
};

export async function fetchHomePage(): Promise<HomePageResponse> {
  const token = await getAuthToken();

  const response = await fetch(HOME_PAGE_ENDPOINT, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load homepage (${response.status})`);
  }

  const data = (await response.json()) as Partial<HomePageResponse>;

  if (!data.hero) {
    throw new Error("Homepage payload missing hero section");
  }

  return {
    hero: data.hero,
    about: data.about ?? { title: "", image: "", content: "" },
    choose_us: data.choose_us ?? {
      title: "",
      description: "",
      reasons: [],
    },
    programs: data.programs ?? {
      title: "",
      description: "",
      items: [],
    },
  };
}
