import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/dashboard/admin`;

export const fetchAll = createAsyncThunk("dashboard/fetchAll", async () => {
  try {
    const response = await axios.get(API_URL);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  dashboard: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
};
const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DashboardSlice.reducer;
