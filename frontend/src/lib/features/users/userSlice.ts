import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersAPI from "@/api/user";
import { UserT } from "@/types/user";

interface UsersSliceState {
  error: unknown;
  loading: boolean;
  users: Set<UserT>;
  results: Set<UserT>;
  usersMap: Map<string, UserT>;
}

const initialState: UsersSliceState = {
  error: null,
  loading: false,
  users: new Set(),
  results: new Set(),
  usersMap: new Map(),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as UserT[]).forEach((user) => state.users.add(user));
      state.results = new Set(action.payload?.data as UserT[]);
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const user = action.payload?.data as UserT;
      state.usersMap.set(user.id, user);
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
  },
});

export const getAllUsers = createAsyncThunk("users/all", async () => {
  return await usersAPI.getAllUsers();
});

export const getUserById = createAsyncThunk("users/id", async (id: string) => {
  return await usersAPI.getUserById(id);
});

export type { UsersSliceState };
export const {} = usersSlice.actions;
export default usersSlice;
