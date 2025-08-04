import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_HOST}/organisations`;
const userToken = sessionStorage.getItem("userToken");

export const fetchAll = createAsyncThunk(
  "service-centers/fetchAll",
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

export const fetchById = createAsyncThunk(
  "service-centers/fetchById",
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
  "service-centers/create",
  async (service_center) => {
    try {
      const response = await axios.post(API_URL, service_center);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const update = createAsyncThunk(
  "service-centers/update",
  async (service_centers, { getState, rejectWithValue }) => {
    const { service_center } = getState().service;
    try {
      const response = await axios.put(
        `${API_URL}/${service_center.id}`,
        service_centers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const remove = createAsyncThunk("service-centers/remove", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});
export const fetchDistricts = createAsyncThunk(
  "service-centers/fetchDistricts",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}/districts`
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateDistrict = createAsyncThunk(
  "service-centers/updateDistrict",
  async (service_center_code, { getState, rejectWithValue }) => {
    const { district } = getState().service;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_HOST}/districts/${district.code}`,
        service_center_code
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  service_centers: [],
  service_center: null,
  districts: [],
  district: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
  is_add_district: false,
};

const serviceCenterSlice = createSlice({
  name: "serviceCenter",
  initialState,
  reducers: {
    setCenter: (state, action) => {
      state.service_center = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addDistrict: (state, action) => {
      state.is_add_district = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
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
        state.service_centers = action.payload.organisations;
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
        state.service_center = action.payload;
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
        state.service_centers.push(action.payload);
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
        const index = state.service_centers.findIndex(
          (service_center) => service_center.id === action.payload.id
        );
        if (index !== -1) {
          state.service_centers[index] = action.payload;
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
        state.service_centers = state.service_centers.filter(
          (service_center) => service_center.id !== action.payload
        );
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload.districts;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        const index = state.districts.findIndex(
          (district) => district.code === action.payload.code
        );
        if (index !== -1) {
          state.districts[index] = action.payload;
        }
      })
      .addCase(updateDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCenter, setMode, setCurrentPage, addDistrict, setDistrict } =
  serviceCenterSlice.actions;
export default serviceCenterSlice.reducer;
