import { defineStorage } from "@aws-amplify/backend";
import { isSandbox } from "../utils";

export const storage = defineStorage({
  name: isSandbox ? "kalev-media-files-sandbox" : "kalev-media-files",
  access: (allow) => ({
    "public/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "delete", "write"]),
    ],
    "protected/*": [allow.authenticated.to(["read", "delete", "write"])],
    "private/*": [allow.authenticated.to(["read", "delete", "write"])],
  }),
});
