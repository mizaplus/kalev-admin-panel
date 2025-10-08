import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "kalevmedia",
  access: (allow) => ({
    "public/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "delete", "write"]),
    ],
    "protected/*": [allow.authenticated.to(["read", "delete", "write"])],
    "private/*": [allow.authenticated.to(["read", "delete", "write"])],
  }),
});
