import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

interface ParamsType {
  taskId: number;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axios.delete(`/api/tasks?taskId=${params.taskId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
