import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersAPI from "@/api/user";
import { RootState } from "@/lib/store";
import { UserT } from "@/types/user";

interface UsersSliceState {
  error: unknown;
  loading: boolean;
  userIds: string[];
  searchResults: string[];
  usersById: Record<string, UserT>;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: UsersSliceState = {
  error: null,
  loading: false,
  userIds: [],
  searchResults: [],
  usersById: {},
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
      state.searchResults = [];
      (action.payload?.data as UserT[]).forEach((user) => {
        state.usersById[user.id] = user;
        if (!state.userIds.includes(user.id)) state.userIds.push(user.id);
        if (!state.searchResults.includes(user.id)) state.searchResults.push(user.id);
      });
      state.loading = false;
      state.error = null;
      state.hasMore = !!action.payload?.meta?.hasMore;
      state.page = state.page + 1;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      const user = action.payload?.data as UserT;
      state.usersById[user.id] = user;
      if (!state.userIds.includes(user.id)) state.userIds.push(user.id);
      if (!state.searchResults.includes(user.id)) state.searchResults.push(user.id);
      state.loading = false;
      state.error = null;
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
