import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/products`;
const userToken = sessionStorage.getItem("userToken");

export const fetchAll = createAsyncThunk(
  "products/fetchAll",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.skip = page;
      if (size !== 0) params.take = size;
      if (filter) params.filter = filter;
      const response = await axios.get(API_URL, {
        params,
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchById = createAsyncThunk("products/fetchById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const create = createAsyncThunk("products/create", async (component) => {
  try {
    const response = await axios.post(API_URL, component, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const update = createAsyncThunk("products/update", async (component) => {
  try {
    const response = await axios.put(`${API_URL}/${component.id}`, {
      component,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const remove = createAsyncThunk("products/remove", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return id;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  products: [],
  product: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
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
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
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
      })
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.components.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        const index = state.components.findIndex(
          (component) => component.id === action.payload.id
        );
        if (index !== -1) {
          state.components[index] = action.payload;
        }
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.components = state.components.filter(
          (component) => component.id !== action.payload
        );
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProduct, setMode, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
