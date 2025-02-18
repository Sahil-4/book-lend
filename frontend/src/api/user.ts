import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/users?page=${page}&limit=${limit}`);
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
