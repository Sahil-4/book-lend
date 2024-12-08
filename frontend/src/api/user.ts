import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";

export const getAllUsers = async () => {
  try {
    const response = await API.get("/api/v1/users");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await API.get(`/api/v1/users/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};
