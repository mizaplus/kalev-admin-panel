// Types for Get Involved page
export interface GetInvolvedHero {
  title: string;
  tagline: string;
  image: string;
  key: {
    SK: string;
    PK: string;
  };
}

export interface GetInvolvedOption {
  icon: string;
  description: string;
  buttonText: string;
  title: string;
  color: string;
  buttonLink: string;
  key: {
    SK: string;
    PK: string;
  };
}

export interface GetInvolvedInvolvement {
  title: string;
  description: string;
  key: {
    SK: string;
    PK: string;
  };
  options: GetInvolvedOption[];
}

export interface GetInvolvedPageData {
  hero: GetInvolvedHero;
  involvement: GetInvolvedInvolvement;
}
