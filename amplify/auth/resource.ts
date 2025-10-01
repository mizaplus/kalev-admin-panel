import { defineAuth } from '@aws-amplify/backend';
import { isSandbox } from '../utils';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  name: isSandbox ? 'kalev-auth-dev' : 'kalev-auth-prod',
  loginWith: {
    email: true,
  },
});
