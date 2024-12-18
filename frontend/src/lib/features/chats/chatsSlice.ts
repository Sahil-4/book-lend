import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as chatsAPI from "@/api/chat";
import { ChatT } from "@/types/chat";
import { MessageCreate, MessageT } from "@/types/message";

interface ChatsSliceState {
  error: unknown;
  loading: boolean;
  chats: Set<ChatT>;
  chatsMap: Map<string, ChatT>;
  chatsMessages: Map<string, Set<MessageT>>;
}

const initialState: ChatsSliceState = {
  error: null,
  loading: false,
  chats: new Set(),
  chatsMap: new Map(),
  chatsMessages: new Map(),
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as ChatT[]).forEach((chat) => state.chats.add(chat));
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const chat = action.payload?.data as ChatT;
      state.chatsMap.set(chat.id, chat);
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const chat = action.payload?.data as ChatT;
      state.chats.add(chat);
      state.chatsMap.set(chat.id, chat);
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chats.forEach((chat) => {
        if (chat.id === action.meta.arg) state.chats.delete(chat);
      });
    });
    builder.addCase(addChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addChatMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const message = action.payload?.data as MessageT;
      if (state.chatsMessages.get(message.chatId) === null) {
        state.chatsMessages.set(message.chatId, new Set());
      }
      state.chatsMessages.get(message.chatId)?.add(message);
    });
    builder.addCase(deleteChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChatMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chatsMessages.get(action.meta.arg.cid)?.forEach((message) => {
        if (message.id == action.meta.arg.mid) {
          state.chatsMessages.get(action.meta.arg.cid)?.delete(message);
        }
      });
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
  },
});

export const getAllChats = createAsyncThunk("chats/all", async () => {
  return await chatsAPI.getAllChats();
});

export const getChat = createAsyncThunk("chats/id", async (id: string) => {
  return await chatsAPI.getChat(id);
});

export const createChat = createAsyncThunk("chats/create", async (participants: string[]) => {
  return await chatsAPI.createChat(participants);
});

export const deleteChat = createAsyncThunk("chats/delete", async (id: string) => {
  return await chatsAPI.deleteChat(id);
});

export const addChatMessage = createAsyncThunk(
  "chats/add-message",
  async ({ id, message }: { id: string; message: MessageCreate }) => {
    return await chatsAPI.addChatMessage(id, message);
  },
);

export const deleteChatMessage = createAsyncThunk(
  "chats/delete-message",
  async (ids: { cid: string; mid: string }) => {
    return await chatsAPI.deleteChatMessage(ids.mid);
  },
);

export type { ChatsSliceState };
export const {} = chatsSlice.actions;
export default chatsSlice;
