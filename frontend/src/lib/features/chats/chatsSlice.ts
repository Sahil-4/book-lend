import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as chatsAPI from "@/api/chat";
import { ChatT } from "@/types/chat";
import { RootState } from "@/lib/store";
import { MessageCreate, MessageT } from "@/types/message";

interface ChatsSliceState {
  error: unknown;
  loading: boolean;
  chatsById: Record<string, ChatT>;
  messagesById: Record<string, MessageT>;
  chatIds: string[];
  messageIdByChatId: Record<string, string[]>;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: ChatsSliceState = {
  error: null,
  loading: false,
  chatsById: {},
  messagesById: {},
  chatIds: [],
  messageIdByChatId: {},
  page: 1,
  limit: 10,
  hasMore: true,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<MessageT>) {
      state.messagesById[action.payload.id] = action.payload;
      const allMessages = state.messageIdByChatId[action.payload.chatId] || [];
      allMessages.unshift(action.payload.id);
      state.messageIdByChatId[action.payload.chatId] = allMessages;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      (action.payload?.data as ChatT[]).forEach((chat) => {
        if (!state.chatIds.includes(chat.id)) state.chatIds.push(chat.id);
        state.chatsById[chat.id] = chat;
        state.messageIdByChatId[chat.id] = [];
      });
      state.loading = false;
      state.error = null;
      state.hasMore = !!action.payload?.meta?.hasMore;
      state.page = state.page + 1;
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      const chatId = action.meta.arg.chatId;
      const messages = state.messageIdByChatId[chatId] || [];
      (action.payload?.data as MessageT[]).forEach((message) => {
        if (!messages.includes(message.id)) messages.push(message.id);
        state.messagesById[message.id] = message;
      });
      state.messageIdByChatId[chatId] = messages;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      const chat = action.payload?.data as ChatT;
      if (!state.chatIds.includes(chat.id)) state.chatIds.push(chat.id);
      state.chatsById[chat.id] = chat;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.chatIds = state.chatIds.filter((id) => id !== action.meta.arg);
      delete state.chatsById[action.meta.arg];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addChatMessage.fulfilled, (state, action) => {
      const message = action.payload?.data as MessageT;
      const messages = state.messageIdByChatId[message.chatId];
      messages.push(message.id);
      state.messagesById[message.id] = message;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChatMessage.fulfilled, (state, action) => {
      state.messageIdByChatId[action.meta.arg.cid] = state.messageIdByChatId[
        action.meta.arg.cid
      ].filter((messageId) => messageId !== action.meta.arg.mid);
      delete state.messagesById[action.meta.arg.mid];
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

export const findChatByUserIds = (state: ChatsSliceState, userId1: string, userId2: string) => {
  for (const chatId of state.chatIds) {
    const participants = state.chatsById[chatId].participants;
    if (
      (participants[0].id === userId1 && participants[1].id === userId2) ||
      (participants[1].id === userId1 && participants[2].id === userId2)
    ) {
      return state.chatsById[chatId];
    }
  }
  return null;
};

export const getChat = (state: ChatsSliceState, id: string) => {
  for (const chatId of state.chatIds) {
    const chat = state.chatsById[chatId];
    if (chat.id == id || chat.participants[0].id == id || chat.participants[1].id == id) {
      return chat;
    }
  }
  return null;
};

export const getAllChats = createAsyncThunk("chats/all", async (_, { getState }) => {
  const { page, limit } = (getState() as RootState).chats;
  return await chatsAPI.getAllChats(page, limit);
});

export const getChatMessages = createAsyncThunk(
  "chats/messages",
  async ({ chatId, page = 1, limit = 30 }: { chatId: string; page?: number; limit?: number }) => {
    return await chatsAPI.getChatMessages(chatId, page, limit);
  },
);

export const createChat = createAsyncThunk(
  "chats/create",
  async (participants: { participant1: string; participant2: string }) => {
    return await chatsAPI.createChat(participants);
  },
);

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
export const { messageReceived } = chatsSlice.actions;
export default chatsSlice;
