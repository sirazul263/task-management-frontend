import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { getErrorMessage, getMessage } from "@/lib/utils";

interface ProjectPayload {
  id: number;
  name: string;
  key: string;
  image: string | File;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ProjectPayload>({
    mutationFn: async (payload) => {
      const response = await axios.put("/api/projects", payload);
      if (response.status !== 200 || response.data.status !== 1) {
        throw new Error(
          response.status !== 200
            ? getErrorMessage(response)
            : getMessage(response.data)
        );
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Project updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
