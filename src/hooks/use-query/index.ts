import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = <TData = unknown>(
  queryKey: QueryKey,
  queryFn: QueryFunction
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery<
    ReturnType<typeof queryFn>,
    Error,
    TData
  >({
    queryKey,
    queryFn,
  });

  return { data, isPending, isFetched, refetch, isFetching };
};
