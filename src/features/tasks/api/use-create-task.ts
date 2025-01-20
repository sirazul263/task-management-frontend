import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { getErrorMessage, getMessage } from "@/lib/utils";
import { Priority, TaskStatus } from "../types";

interface TaskPayload {
  projectId: string;
  issueType: string;
  title: string;
  description: string;
  dueDate: Date;
  assigneeId: string;
  status: TaskStatus;
  priority: Priority;
  parent?: string | undefined;
  storyPoint?: string | undefined;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, TaskPayload>({
    mutationFn: async (payload) => {
      const response = await axios.post("/api/tasks", payload);
      if (response.status !== 200 || response.data.status !== 1) {
        throw new Error(
          response.status !== 200
            ? getErrorMessage(response)
            : getMessage(response.data)
        );
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create task");
    },
  });

  return mutation;
};
