import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

interface ParamsType {
  projectId: number;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axios.delete(
        `/api/projects?projectId=${params.projectId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Project deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
