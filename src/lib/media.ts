const MEDIA_BASE_URL = "https://media.kalevchild.org";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i;

const DATA_URL_PREFIXES = ["data:", "blob:"] as const;

export function resolveMediaUrl(source?: string | null): string {
  if (!source) {
    return "";
  }

  const raw = source.trim();
  if (!raw) {
    return "";
  }

  if (
    ABSOLUTE_URL_REGEX.test(raw) ||
    DATA_URL_PREFIXES.some((prefix) => raw.startsWith(prefix))
  ) {
    return raw;
  }

  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;

  const encodedPath = normalized
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${MEDIA_BASE_URL}/${encodedPath}`;
}
