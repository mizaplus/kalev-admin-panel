import { Authenticator } from "@aws-amplify/ui-react";
import type React from "react";

const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center bg-white p-6 rounded-t-lg">
    <img src="/logo.svg" alt="Kalev Logo" className="h-12 mb-4" />
    <p className="text-gray-600 text-sm">{title}</p>
  </div>
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-background">
      <Authenticator
        components={{
          Footer: () => (
            <div className="p-4 text-center text-xs text-gray-500 bg-gray-50 rounded-b-lg border-t">
              © 2025 Kalev. All rights reserved.
            </div>
          ),
          SignIn: {
            Header: () => (
              <AuthHeader title="Sign in to access the admin dashboard" />
            ),
          },
          ConfirmResetPassword: {
            Header: () => (
              <AuthHeader title="Reset your password to regain access" />
            ),
          },
          ConfirmSignUp: {
            Header: () => (
              <AuthHeader title="Confirm your sign up to continue" />
            ),
          },
          ForceNewPassword: {
            Header: () => (
              <AuthHeader title="Set a new password to secure your account" />
            ),
          },
          ForgotPassword: {
            Header: () => (
              <AuthHeader title="Forgot your password? Let's reset it." />
            ),
          },
          SetupTotp: {
            Header: () => (
              <AuthHeader title="Set up TOTP for enhanced security" />
            ),
          },
          VerifyUser: {
            Header: () => (
              <AuthHeader title="Verify your account to proceed" />
            ),
          },
          SelectMfaType: {
            Header: () => (
              <AuthHeader title="Select your MFA method for added security" />
            ),
          },
        }}
        className="shadow-sm rounded-lg overflow-hidden overflow-hidden border !bg-card"
        hideSignUp={true}
        signUpAttributes={[]}
      >
        {children}
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
