import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";
import { MessageCreate } from "@/types/message";

export const getAllChats = async () => {
  try {
    const response = await API.get("/api/v1/chats");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getChat = async (id: string) => {
  try {
    const response = await API.get(`/api/v1/chats/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const createChat = async (participants: string[]) => {
  try {
    const response = await API.post("/api/v1/chats", participants);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const addChatMessage = async (id: string, message: MessageCreate) => {
  try {
    const response = await API.post(`/api/v1/chats/message/${id}`, message);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteChatMessage = async (id: string) => {
  try {
    const response = await API.delete(`/api/v1/chats/message/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteChat = async (id: string) => {
  try {
    const response = await API.delete(`/api/v1/chats/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};
