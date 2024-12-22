import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authAPI from "@/api/auth";
import { UserLogin, UserSignup, UserT } from "@/types/user";

interface AuthSliceState {
  error: unknown;
  loading: boolean;
  authenticated: boolean;
  user: UserT | null;
}

const initialState: AuthSliceState = {
  error: null,
  loading: false,
  authenticated: localStorage.getItem("user") ? true : false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload ? (action.payload.data as UserT) : null;
      state.authenticated = action.payload !== undefined;
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload ? (action.payload.data as UserT) : null;
      state.authenticated = action.payload !== undefined;
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.authenticated = false;
      localStorage.removeItem("user");
    });

    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload ? (action.payload.data as UserT) : null;
      state.authenticated = action.payload !== undefined;
    });

    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload ? (action.payload.data as UserT) : null;
      state.authenticated = action.payload !== undefined;
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
  },
});

export const signup = createAsyncThunk("auth/signup", async (user: UserSignup) => {
  return await authAPI.signup(user);
});

export const login = createAsyncThunk("auth/login", async (user: UserLogin) => {
  return await authAPI.login(user);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authAPI.logout();
});

export const getUserProfile = createAsyncThunk("auth/profile", async () => {
  return await authAPI.getUserProfile();
});

export const updateUserProfile = createAsyncThunk("auth/update", async (user: Partial<UserT>) => {
  return await authAPI.updateUserProfile(user);
});

export type { AuthSliceState };
export const {} = authSlice.actions;
export default authSlice;
