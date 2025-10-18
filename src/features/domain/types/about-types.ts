// This context will be similar to homepage-context but for about page
type AboutPageHero = {
  image: string;
  tagline: string;
  title: string;
  key: { SK: string; PK: string };
};

type AboutPageStory = {
  title: string;
  content: string;
  key: { SK: string; PK: string };
};

type AboutPageMissionVision = {
  vision: string;
  mission: string;
  key: { SK: string; PK: string };
};

type AboutPageObjectives = {
  content: string;
  key: { SK: string; PK: string };
};

type AboutPageDirector = {
  name: string;
  image: string;
  content: string;
  key: { SK: string; PK: string };
};

type AboutPageTeamMember = {
  name: string;
  image: string;
  role: string;
  key: { SK: string; PK: string };
};

type AboutPageTeam = {
  director: AboutPageDirector;
  members: AboutPageTeamMember[];
};

type AboutPageInfo = {
  mission_vision: AboutPageMissionVision;
  objectives: AboutPageObjectives;
};

type AboutPageData = {
  hero: AboutPageHero;
  story: AboutPageStory;
  info: AboutPageInfo;
  team: AboutPageTeam;
};

export type { AboutPageData, AboutPageTeamMember };
