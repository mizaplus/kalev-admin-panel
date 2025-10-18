export type ProgramKey = {
  SK: string;
  PK: string;
};

export type ProgramsHero = {
  title: string;
  image: string;
  tagline: string;
  key: ProgramKey;
};

export type ProgramItem = {
  description: string;
  image: string;
  title: string;
  slug: string;
  key: ProgramKey;
};

export type ProgramsSection = {
  title: string;
  description: string;
  key: ProgramKey;
  items: ProgramItem[];
};

export type ProgramsPageData = {
  hero: ProgramsHero;
  programs: ProgramsSection;
};
