import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";

const initialState = {
  value: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const { data } = await api.get("/api/user/data", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.success ? data.user : null;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/api/user/update", userData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      });

      if (data.success) {
        toast.success(data.message);
        return data.user;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("Update failed:", action.payload);
      });
  },
});

export default userSlice.reducer;
