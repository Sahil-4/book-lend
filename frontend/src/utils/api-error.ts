import { isAxiosError } from "axios";

export const handleApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    console.error("API Error ::", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "An error occurred");
  } else {
    console.error("Unexpected Error ::", error);
    throw new Error("An unexpected error occurred");
  }
};
