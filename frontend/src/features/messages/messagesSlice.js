import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  messages: [],
  recentMessages: [],
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, userId }) => {
    const { data } = await api.post(
      "/api/message/get",
      { to_user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data.success ? data : null;
  }
);

export const fetchRecentMessages = createAsyncThunk(
  "messages/fetchRecentMessages",
  async (token) => {
    const { data } = await api.get("/api/user/recent-messages", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      // group messages by sender & get the latest message for each sender
      const groupMessages = data.messages.reduce((acc, message) => {
        const senderId = message.from_user_id._id;

        if (
          !acc[senderId] ||
          new Date(message.createdAt) > new Date(acc[senderId].createdAt)
        ) {
          acc[senderId] = message;
        }

        return acc;
      }, {});

      // sort messages by date
      const sortedMessages = Object.values(groupMessages).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedMessages;
    }

    return [];
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = action.payload.messages;
      }
    });

    builder.addCase(fetchRecentMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.recentMessages = action.payload;
      }
    });
  },
});

export const { setMessage, addMessage, resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
