import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useClerkSignIn = (redirectUrl: string) => {
  const router = useRouter();

  const initiateClerkLogin = async () => {
    try {
      await signIn("clerk", { redirectTo: redirectUrl });
    } catch (error) {
      if (error instanceof AuthError) {
        return router.push(`api/auth/error?error=${error.type}`);
      }
      throw error;
    }
  };

  return {
    initiateClerkLogin,
  };
};
