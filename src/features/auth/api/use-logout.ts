import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/sign-out");
      if (response.status !== 200) {
        throw new Error({ message: "Failed to logout", statusCode: 500 });
      }
      Cookies.remove("authToken");
      Cookies.remove("authUser");
      return response.data;
    },
    onSuccess: () => {
      toast.success("Logged out successfully!");
      router.refresh();
      queryClient.invalidateQueries();
    },
    onError: (e) => {
      console.error(e);

      toast.error("Failed to logout!");
    },
  });
  return mutation;
};
