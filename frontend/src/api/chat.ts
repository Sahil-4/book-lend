import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";
import { MessageCreate } from "@/types/message";

export const getAllChats = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/chats?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getChatMessages = async (id: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/chats/${id}?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const createChat = async (participants: { participant1: string; participant2: string }) => {
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
