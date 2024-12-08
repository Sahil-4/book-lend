import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";

export const getAllNotifications = async () => {
  try {
    const response = await API.get("/api/v1/notifications");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const readNotification = async () => {
  try {
    const response = await API.get("/api/v1/notifications/read");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteNotifications = async () => {
  try {
    const response = await API.delete("/api/v1/notifications");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};
