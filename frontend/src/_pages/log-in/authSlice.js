import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { Await } from "react-router-dom";

const userToken = sessionStorage.getItem("userToken");
const initialState = {
  user: null,
  token: userToken,
  isAuthenticated: !!userToken,
  loading: false,
  error: null,
};

const SERVER_URL = import.meta.env.VITE_API_HOST + "/auth";

/* console.log(userToken, "userToken"); */
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(SERVER_URL + "/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const register = createAsyncThunk("auth/create", async (data) => {
  try {
    const response = await axios.post(SERVER_URL + "/registerform", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      sessionStorage.setItem("userToken", null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loaded = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.isAuthenticated = true;
        sessionStorage.setItem("userToken", action.payload?.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
        Toast.error(action.payload.message);
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setuser, userLogout } = loginSlice.actions;
export default loginSlice.reducer;
