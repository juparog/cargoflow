"use client";

import { Button } from "@/components/ui";
import { useClerkSignIn } from "@/hooks/auth/clerk";
import { Google } from "@/icons/google";
import { Microsoft } from "@/icons/microsoft";
import { Loader } from "../loader";

type ClerkOAuthButtonProps = {
  method: "register" | "login";
  redirectUrl?: string;
};

export const ClerkOAuthButton = ({ redirectUrl }: ClerkOAuthButtonProps) => {
  const { initiateClerkLogin } = useClerkSignIn(redirectUrl || "/dashboard");
  return (
    <Button
      onClick={initiateClerkLogin}
      className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Loader loading={false}>
        <Google />
        <Microsoft />
        en Clerk
      </Loader>
    </Button>
  );
};
