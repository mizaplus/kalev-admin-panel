import { fetchAuthSession } from "aws-amplify/auth";

export async function getAuthToken(): Promise<string> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("Missing authentication token");
  }

  return token;
}
