import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get("/api/projects");
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
