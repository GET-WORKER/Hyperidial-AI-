import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/spares`;

export const fetchAll = createAsyncThunk(
  "spares/fetchAll",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.skip = page;
      if (size !== 0) params.take = size;
      if (filter) params.filter = filter;
      const response = await axios.get(API_URL, {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchById = createAsyncThunk("spares/fetchById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const create = createAsyncThunk("spares/create", async (spare) => {
  try {
    const response = await axios.post(API_URL, spare);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const update = createAsyncThunk(
  "spares/update",
  async (spares, { getState, rejectWithValue }) => {
    const { spare } = getState().spare;
    try {
      const response = await axios.put(`${API_URL}/${spare.id}`, spares);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const remove = createAsyncThunk("spares/remove", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  spares: [],
  spare: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
};

const SpareSlice = createSlice({
  name: "spare",
  initialState,
  reducers: {
    setSpare: (state, action) => {
      state.spare = action.payload;
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
        state.spares = action.payload.spares;
        state.currentPage = 1;
        state.totalPages = 1;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.component = action.payload;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSpare, setMode, setCurrentPage } = SpareSlice.actions;
export default SpareSlice.reducer;
