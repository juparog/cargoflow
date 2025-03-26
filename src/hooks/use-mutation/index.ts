import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>,
  queryKey?: string | string[],
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess();

      return toast(
        data?.status === 200 || data?.status === 201 ? "Ok" : "Error",
        {
          description: data?.data,
        }
      );
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: queryKey instanceof Array ? queryKey : [queryKey],
        exact: true,
      });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  const latestVariables = data[data.length - 1];
  return { latestVariables };
};
