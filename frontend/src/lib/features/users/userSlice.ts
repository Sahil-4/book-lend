import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersAPI from "@/api/user";
import { RootState } from "@/lib/store";
import { UserT } from "@/types/user";

interface UsersSliceState {
  error: unknown;
  loading: boolean;
  users: Set<UserT>;
  results: Set<UserT>;
  usersMap: Map<string, UserT>;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: UsersSliceState = {
  error: null,
  loading: false,
  users: new Set(),
  results: new Set(),
  usersMap: new Map(),
  page: 1,
  limit: 10,
  hasMore: true,
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
      state.hasMore = !!action.payload?.meta?.hasMore;
      state.page = state.page + 1;
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

export const getAllUsers = createAsyncThunk("users/all", async (_, { getState }) => {
  const { page, limit } = (getState() as RootState).users;
  return await usersAPI.getAllUsers(page, limit);
});

export const getUserById = createAsyncThunk("users/id", async (id: string) => {
  return await usersAPI.getUserById(id);
});

export type { UsersSliceState };
export const {} = usersSlice.actions;
export default usersSlice;
