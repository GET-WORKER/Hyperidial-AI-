import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/tags`;

export const fetchAll = createAsyncThunk(
  "tags/fetchAll",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.page = page;
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

export const fetchById = createAsyncThunk("tags/fetchById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const create = createAsyncThunk("tags/create", async (tag) => {
  try {
    const response = await axios.post(API_URL, tag);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const update = createAsyncThunk(
  "tags/update",
  async (tags, { getState, rejectWithValue }) => {
    const { tag } = getState().tag;
    try {
      const response = await axios.put(`${API_URL}/${tag.id}`, tags);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const remove = createAsyncThunk("tags/remove", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  tags: [],
  tag: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
};

const TagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTag: (state, action) => {
      state.tag = action.payload;
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
        state.tags = action.payload.tags;
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

export const { setTag, setMode, setCurrentPage } = TagSlice.actions;
export default TagSlice.reducer;
