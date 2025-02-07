import { onGetUserByEmail } from "@/actions/user";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useQueryData } from "./use-query";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  return session?.user;
};

export const useUserPage = () => {
  const { data: session } = useSession();

  const { data: user } = useQueryData<
    Prisma.PromiseReturnType<typeof onGetUserByEmail>
  >(["notifications"], () => onGetUserByEmail(session?.user?.email || ""));

  return { user };
};
