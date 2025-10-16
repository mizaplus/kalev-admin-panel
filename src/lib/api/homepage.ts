import { getAuthToken } from "@/lib/auth";

const API_ROOT = "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod";
const HOME_PAGE_ENDPOINT = `${API_ROOT}/page/home`;

export type ContentKey = {
  PK: string;
  SK: string;
};

export type ContentItem<T> = {
  key?: ContentKey;
  details: T;
};

export type HomePageHeroDetails = {
  title: string;
  tagline: string;
  image: string;
};

export type HomePageAboutDetails = {
  title: string;
  image: string;
  content: string;
};

export type HomePageReasonDetails = {
  icon: string;
  description: string;
  disabled: boolean;
  title: string;
};

export type HomePageReason = HomePageReasonDetails & {
  key?: ContentKey;
};

export type HomePageChooseUsDetails = {
  title: string;
  description: string;
  reasons: HomePageReason[];
};

export type HomePageProgramDetails = {
  description: string;
  image: string;
  title: string;
  slug: string;
};

export type HomePageProgramsDetails = {
  title: string;
  description: string;
  items: HomePageProgramDetails[];
};

export type HomePageResponse = {
  hero: ContentItem<HomePageHeroDetails>;
  about: ContentItem<HomePageAboutDetails>;
  choose_us: ContentItem<HomePageChooseUsDetails>;
  programs: ContentItem<HomePageProgramsDetails>;
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

  const data = (await response.json()) as Record<string, unknown>;

  if (!data.hero) {
    throw new Error("Homepage payload missing hero section");
  }

  return {
    hero: normalizeContentItem<HomePageHeroDetails>(data.hero, {
      title: "",
      tagline: "",
      image: "",
    }),
    about: normalizeContentItem<HomePageAboutDetails>(data.about, {
      title: "",
      image: "",
      content: "",
    }),
    choose_us: normalizeContentItem<HomePageChooseUsDetails>(data.choose_us, {
      title: "",
      description: "",
      reasons: [],
    }),
    programs: normalizeContentItem<HomePageProgramsDetails>(data.programs, {
      title: "",
      description: "",
      items: [],
    }),
  };
}

function normalizeContentItem<T extends Record<string, unknown>>(
  item: unknown,
  fallback: T,
): ContentItem<T> {
  if (!item || typeof item !== "object") {
    return { details: fallback };
  }

  const maybeItem = item as Record<string, unknown>;
  const key = maybeItem.key as ContentKey | undefined;

  if (maybeItem.details && typeof maybeItem.details === "object") {
    return {
      key,
      details: {
        ...fallback,
        ...(maybeItem.details as Record<string, unknown>),
      } as T,
    };
  }

  const rest = { ...maybeItem };
  delete rest.key;
  return {
    key,
    details: { ...fallback, ...(rest as Record<string, unknown>) } as T,
  };
}

type UpdatePayload<T> = {
  key: ContentKey;
  details: T;
};

async function putContentItem<T>(payload: UpdatePayload<T>): Promise<Response> {
  const token = await getAuthToken();

  return fetch(API_ROOT, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      PK: payload.key.PK,
      SK: payload.key.SK,
      details: payload.details,
    }),
  });
}

async function putContentItems<T>(
  payload: UpdatePayload<T>[],
): Promise<Response> {
  const token = await getAuthToken();

  return fetch(API_ROOT, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      payload.map((item) => ({
        PK: item.key.PK,
        SK: item.key.SK,
        details: item.details,
      })),
    ),
  });
}

export async function updateHomePageHero(
  key: ContentKey,
  details: HomePageHeroDetails,
): Promise<void> {
  const response = await putContentItem({ key, details });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(
      message ?? `Failed to update hero content (${response.status})`,
    );
  }
}

export async function updateHomePageAbout(
  key: ContentKey,
  details: HomePageAboutDetails,
): Promise<void> {
  const response = await putContentItem({ key, details });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(
      message ?? `Failed to update about section (${response.status})`,
    );
  }
}

export async function updateHomePageChooseUs(
  key: ContentKey,
  details: HomePageChooseUsDetails,
): Promise<void> {
  const response = await putContentItem({ key, details });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(
      message ?? `Failed to update reasons section (${response.status})`,
    );
  }
}

export async function updateHomePageEntries(
  entries: Array<{ key: ContentKey; details: unknown }>,
): Promise<void> {
  const response = await putContentItems(entries);

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(
      message ?? `Failed to update homepage entries (${response.status})`,
    );
  }
}

export async function updateHomePagePrograms(
  key: ContentKey,
  details: HomePageProgramsDetails,
): Promise<void> {
  const response = await putContentItem({ key, details });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(
      message ?? `Failed to update programs (${response.status})`,
    );
  }
}

async function extractErrorMessage(response: Response): Promise<string | null> {
  try {
    const data = await response.json();
    if (typeof data === "object" && data && "message" in data) {
      return String((data as { message?: unknown }).message);
    }
    return null;
  } catch {
    return null;
  }
}
