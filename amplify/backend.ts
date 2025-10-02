import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
});

backend.addOutput({
  storage: {
    aws_region: "eu-west-2",
    bucket_name: "kalev-media-files",
  },
  custom: {
    api_id: "frmw9v5tz3",
    api_endpoint: "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod",
    api_name: "main",
  },
})