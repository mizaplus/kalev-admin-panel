import { defineAuth } from '@aws-amplify/backend';

const isSandbox = !process.env.AWS_BRANCH

export const auth = defineAuth({
  name: isSandbox ? 'Kalev-dev' : 'Kalev-prod',
  loginWith: {
    email: true,
  }
});