import apiClient from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
export const useGetProjects = async () => {
  try {
    const response = await apiClient.get("/projects");
    return response.data;
  } catch (err) {
    return {
      status: 0,
      message: getErrorMessage(err),
    };
  }
};
