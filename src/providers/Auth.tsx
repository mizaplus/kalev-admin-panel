"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import type React from "react";

import { Amplify } from "aws-amplify";
import config from "../../amplify_outputs.json";

Amplify.configure({
  ...config,
  API: {
    REST: {
      [config.custom.api_name]: {
        endpoint: config.custom.api_endpoint,
        region: config.auth.aws_region,
      },
    },
  },
});

const appConfig = Amplify.getConfig();
console.log("Amplify Config:", JSON.stringify(appConfig, null, 2));

const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center bg-white p-6 rounded-t-lg pb-0">
    <Image src="/logo.png" alt="Kalev Logo" height={60} width={180} />
    <p className="text-gray-600 text-sm">{title}</p>
    <div className="h-[0.5px] w-full bg-gray-300 mt-5" />
  </div>
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-background">
      <Authenticator
        components={{
          Footer: () => (
            <div className="p-4 text-center text-xs text-gray-500 bg-mutedrounded-b-lg border-t">
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
            Header: () => <AuthHeader title="Verify your account to proceed" />,
          },
          SelectMfaType: {
            Header: () => (
              <AuthHeader title="Select your MFA method for added security" />
            ),
          },
        }}
        className="shadow-sm rounded-lg overflow-hidden delay-500 border"
        hideSignUp={true}
        signUpAttributes={[]}
        formFields={{
          signIn: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
              isRequired: true,
            },
            password: {
              label: "Password",
              placeholder: "Enter your password",
              isRequired: true,
            },
          },
        }}
      >
        {children}
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
