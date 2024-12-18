import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/auth/authSlice";
import booksSlice from "@/lib/features/books/booksSlice";
import chatsSlice from "@/lib/features/chats/chatsSlice";
import userSlice from "@/lib/features/users/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: combineSlices(
      // all slices here 
      authSlice,
      booksSlice,
      chatsSlice,
      userSlice,
    ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
