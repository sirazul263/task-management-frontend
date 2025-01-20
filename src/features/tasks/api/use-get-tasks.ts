import { useQuery } from "@tanstack/react-query";
import Error from "next/error";
import { TaskStatus } from "../types";
import axios from "axios";
import { getErrorMessage } from "@/lib/utils";

interface UseGetTasksProps {
  projectId?: string | null;
  status?: TaskStatus | null;
  search?: string | null;
  assigneeId?: string | null;
  dueDate?: string | null;
}
export const useGetTasks = ({
  projectId,
  status,
  search,
  assigneeId,
  dueDate,
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [projectId, status, search, assigneeId, dueDate],
    queryFn: async () => {
      const response = await axios.get("/api/tasks");
      //    ({
      //     query: {
      //       workspaceId,
      //       projectId: projectId ?? undefined,
      //       assigneeId: assigneeId ?? undefined,
      //       dueDate: dueDate ?? undefined,
      //       search: search ?? undefined,
      //       status: status ?? undefined,
      //     },
      //   });
      if (response.status !== 200) {
        return {
          status: response.status,
          message: getErrorMessage(response),
        };
      }
      return response.data;
    },
  });
  return query;
};
