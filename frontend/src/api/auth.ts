import API from "@/api";
import { handleApiError } from "@/utils/api-error";
import { ResponseType } from "@/types/response";
import { UserLogin, UserSignup } from "@/types/user";

export const login = async (user: UserLogin) => {
  try {
    const response = await API.post("/api/v1/users/login", user);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const signup = async (user: UserSignup) => {
  try {
    const response = await API.post("/api/v1/users/signup", user);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = async () => {
  try {
    const response = await API.get("/api/v1/users/logout");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const issueAccessToken = async () => {
  try {
    const response = await API.get("/api/v1/users/authtoken");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await API.get("/api/v1/users/profile");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserProfile = async (form: FormData) => {
  try {
    API.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "application/form-data";
      return config;
    });

    const response = await API.put("/api/v1/users/profile", form);
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await API.delete("/api/v1/users/profile");
    return response.data as ResponseType;
  } catch (error) {
    handleApiError(error);
  }
};
