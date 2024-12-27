import Cookies from "js-cookie";

export const getCurrent = () => {
  if (typeof window === "undefined") {
    return null; // Ensure this code runs only in the browser, not during SSR
  }
  const userCookie = Cookies.get("authUser");

  if (userCookie) {
    try {
      return JSON.parse(userCookie); // Parse the cookie value if it exists
    } catch (error) {
      console.error("Error parsing authUser cookie:", error);
      return null; // Return null in case of error during parsing
    }
  }

  return null; // Return null if the cookie does not exist
};
