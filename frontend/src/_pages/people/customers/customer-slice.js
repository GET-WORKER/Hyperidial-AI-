import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/customers`;
const userToken = sessionStorage.getItem("userToken");

export const fetchAll = createAsyncThunk(
  "customers/fetchAll",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.skip = page;
      if (size !== 0) params.take = size;
      if (filter) params.filter = filter;
      const response = await axios.get(API_URL, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchcustomerById = createAsyncThunk(
  "customers/fetchcustomerById",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  customers: [],
  customer: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchcustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(fetchcustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCustomer, setMode, setCurrentPage } = CustomerSlice.actions;
export default CustomerSlice.reducer;
