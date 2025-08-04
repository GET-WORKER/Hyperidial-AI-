import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: "",
  message: "",
  onConfirm: null,
  onCancel: null,
};

const confirmationDialogSlice = createSlice({
  name: "confirmationDialog",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      const { title, message, onConfirm, onCancel } = action.payload;
      state.show = true;
      state.title = title || "error";
      state.message = message || "error";
      state.onConfirm = onConfirm;
      state.onCancel = onCancel;
    },
    hideDialog: (state) => {
      state.show = false;
      state.title = "";
      state.message = "";
      state.onConfirm = null;
      state.onCancel = null;
    },
  },
});

export const { showDialog, hideDialog } = confirmationDialogSlice.actions;
export default confirmationDialogSlice.reducer;
