import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  name: 'kalevAdminAuth',
  loginWith: {
    email: true,
  }
});