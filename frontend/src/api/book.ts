import API from "@/api/";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";

export const getMyBooks = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/books?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllBooks = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/books/all?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const searchBooks = async (query: string, page: number = 1, limit: number = 40) => {
  try {
    const response = await API.get(`/api/v1/books/search?${query}&page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await API.get(`/api/v1/books/search/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllAuthors = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/books/authors?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllGenres = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await API.get(`/api/v1/books/genres?page=${page}&limit=${limit}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const createBook = async (book: FormData) => {
  try {
    API.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "application/form-data";
      return config;
    });

    const response = await API.post("/api/v1/books", book);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateBook = async (book: FormData, id: string) => {
  try {
    API.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "application/form-data";
      return config;
    });

    const response = await API.put(`/api/v1/books/${id}`, book);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await API.delete(`/api/v1/books/${id}`);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};
