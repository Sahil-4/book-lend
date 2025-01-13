import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as chatsAPI from "@/api/chat";
import { ChatT } from "@/types/chat";
import { MessageCreate, MessageT } from "@/types/message";

interface ChatsSliceState {
  error: unknown;
  loading: boolean;
  chats: ChatT[];
  chatsMap: Map<string, ChatT>;
  chatsMessages: Map<string, MessageT[]>;
}

const initialState: ChatsSliceState = {
  error: null,
  loading: false,
  chats: [],
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
      (action.payload?.data as ChatT[]).forEach((chat) => state.chatsMap.set(chat.id, chat));
      state.chats = Array.from(state.chatsMap.values());
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const messages = new Map<string, MessageT>();
      state.chatsMessages.get(action.meta.arg)?.forEach((message) => {
        messages.set(message.id, message);
      });
      (action.payload?.data as ChatT).messages?.forEach((message) => {
        messages.set(message.id, message);
      });
      state.chatsMessages.set(action.meta.arg, Array.from(messages.values()));
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const chat = action.payload?.data as ChatT;
      state.chatsMap.set(chat.id, chat);
      state.chats = Array.from(state.chatsMap.values());
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chatsMap.delete(action.meta.arg);
      state.chats = Array.from(state.chatsMap.values());
    });
    builder.addCase(addChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addChatMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const message = action.payload?.data as MessageT;
      const messages: MessageT[] = state.chatsMessages.get(message.chatId) || [];
      messages.push(message);
      state.chatsMessages.set(message.chatId, messages);
    });
    builder.addCase(deleteChatMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChatMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chatsMessages.set(
        action.meta.arg.cid,
        (state.chatsMessages.get(action.meta.arg.cid) || []).filter(
          (message) => message.id !== action.meta.arg.mid,
        ),
      );
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
  return state.chats.find(
    (chat) =>
      chat.participants.some((p) => p.id === userId1) &&
      chat.participants.some((p) => p.id === userId2),
  );
};

export const getChatById = (state: ChatsSliceState, id: string) => {
  return state.chats.find((chat) => chat.id === id);
};

export const getAllChats = createAsyncThunk("chats/all", async () => {
  return await chatsAPI.getAllChats();
});

export const getChatMessages = createAsyncThunk("chats/messages", async (id: string) => {
  return await chatsAPI.getChatMessages(id);
});

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
export const {} = chatsSlice.actions;
export default chatsSlice;
