import { defineAuth } from "@aws-amplify/backend";
import { isSandbox } from "../utils";

const auth = defineAuth({
  name: isSandbox ? "kalev-cms-sandbox" : "kalev-cms",
  loginWith: {
    email: true,
  },
});

export default auth;
