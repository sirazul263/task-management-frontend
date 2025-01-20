import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (err: unknown): string => {
  // First, check if `err` is an object and not null
  if (typeof err === "object" && err !== null) {
    // Now, narrow the type of `err` by checking for the `errors` property
    if ("errors" in err) {
      const errors = (err as { errors?: Record<string, string[]> }).errors;
      if (errors) {
        return Object.values(errors)[0][0] || "An unknown error occurred";
      }
    }

    // Check if `err` has a `message` property
    if ("message" in err) {
      const message = (err as { message?: string | Record<string, string[]> })
        .message;

      if (typeof message === "object" && message !== null) {
        return Object.values(message)[0][0] || "An unknown error occurred";
      }

      if (typeof message === "string") {
        return message;
      }
    }
  }
  // If `err` doesn't have the expected structure, return a default message
  return "An unknown error occurred";
};

export const getMessage = (res: unknown): string | undefined => {
  console.log(res);
  // First, check if `err` is an object and not null
  if (typeof res === "object" && res !== null) {
    // Now, narrow the type of `err` by checking for the `errors` property

    // Check if `err` has a `message` property
    if ("message" in res) {
      if (typeof res.message === "object" && res.message !== null) {
        return Object.values(res.message)[0][0] || "An unknown error occurred";
      }

      if (typeof res.message === "string") {
        return res.message;
      }
    }
    // If `err` doesn't have the expected structure, return a default message
    return "An unknown error occurred";
  }
};

export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
