import { onGetTransportRoutes } from "@/actions/transport-routes";
import { Prisma } from "@prisma/client";
import { useQueryData } from "./use-query";

export const useFetchTransportRoutes = () => {
  const { data: transportRoutes, isPending: isPendingTransportRoutes } =
    useQueryData<Prisma.PromiseReturnType<typeof onGetTransportRoutes>>(
      ["TransportRoutes"],
      () => onGetTransportRoutes()
    );

  return { transportRoutes, isPendingTransportRoutes };
};
