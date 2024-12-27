import axios from "axios";
import { cookies } from "next/headers"; // Import for Next.js server-side cookies

const apiClient = axios.create({
  baseURL: process.env.API_URL, // Use environment variables for the API URL
  timeout: 10000, // Optional: Set a timeout
});

// Add a request interceptor to include the authorization token
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
