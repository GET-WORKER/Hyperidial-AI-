import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/spare-requests`;
const userToken = sessionStorage.getItem("userToken");

export const fetchSpareRequests = createAsyncThunk(
  "spare_request/fetchSpareRequests",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.skip = page;
      if (size !== 0) params.take = size;
      if (filter) params.filter = filter;
      const response = await axios.get(API_URL, { params: params });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSpareRequestById = createAsyncThunk(
  "spare_requests/fetchSpareRequestById",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const create = createAsyncThunk(
  "spare_requests/create",
  async (spare_request) => {
    try {
      const response = await axios.post(API_URL, spare_request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSpareRequest = createAsyncThunk(
  "spare_requests/updateSpareRequest",
  async (spare_requests, { getState, rejectWithValue }) => {
    const { spare_request } = getState().spare_request;
    try {
      const response = await axios.put(
        `${API_URL}/${spare_request.id}`,
        spare_requests
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const remove = createAsyncThunk("spare_requests/remove", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  spare_requests: [],
  spare_request: null,
  customer: {},
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
  isRequestSelect: false,
};

const spare_requestSlice = createSlice({
  name: "spare_request",
  initialState,
  reducers: {
    setSpare: (state, action) => {
      state.spare_request = action.payload;
    },

    setCustomer: (state, action) => {
      state.customer = action.payload.data;
      state.isRequestSelect = action.payload.state;
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
      .addCase(fetchSpareRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpareRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.spare_requests = action.payload.spare_requests;
        state.currentPage = 1;
        state.totalPages = state.spare_requests?.length / 10;
      })
      .addCase(fetchSpareRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSpareRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpareRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.spare_request = action.payload;
      })
      .addCase(fetchSpareRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.spare_requests.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSpareRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpareRequest.fulfilled, (state, action) => {
        const index = state.spare_requests.findIndex(
          (spare_request) => spare_request.id === action.payload.id
        );
        if (index !== -1) {
          state.spare_requests[index] = action.payload;
        }
      })
      .addCase(updateSpareRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.spare_requests = state.spare_requests.filter(
          (spare_request) => spare_request.id !== action.payload
        );
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSpare, setCustomer, setMode, setCurrentPage } =
  spare_requestSlice.actions;
export default spare_requestSlice.reducer;
