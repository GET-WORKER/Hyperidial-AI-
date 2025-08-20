import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../_pages/log-in/authSlice";
import menuReducer from "../../_lib/_layout/top-navbar/navSlice";
import confirmationReducer from "../_layout/common-components/confirmation-dialog/confirmation-slice";
import dashboardReducer from "../../_pages/dasboard/dashboard-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    dashboard: dashboardReducer,
    confirmationDialog: confirmationReducer,
  },
});

export default store;
