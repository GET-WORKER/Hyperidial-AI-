import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../_pages/log-in/authSlice";
import menuReducer from "../../_lib/_layout/top-navbar/navSlice";
import productsReducer from "../../_pages/products/products/products-slice";
import tagsReducer from "../../_pages/products/tags/tags-slice";
import customerReducer from "../../_pages/people/customers/customer-slice";
import usersReducer from "../../_pages/people/users/users-slice";
import sparesReducer from "../../_pages/products/spares/spares-slice";
import projectsReducer from "../../_pages/projects/projects/projects-slice";
import teamsReducer from "../../_pages/projects/teams/teams-slice";
import serviceCenterReducer from "../../_pages/projects/service-center/service-center-slice";
import organizationsReducer from "../../_pages/people/organizations/organizations-slice";
import stakeHoldersReducer from "../../_pages/people/stake-holders/stake-holders-slice";
import ticketsReducer from "../../_pages/tickets/tickets/tickets-slice";
import confirmationReducer from "../_layout/common-components/confirmation-dialog/confirmation-slice";
import spareRequestReducer from "../../_pages/tickets/spare-requests/spare-request-slice";
import dashboardReducer from "../../_pages/dasboard/dashboard-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    dashboard: dashboardReducer,
    product: productsReducer,
    tag: tagsReducer,
    customer: customerReducer,
    user: usersReducer,
    project: projectsReducer,
    team: teamsReducer,
    service: serviceCenterReducer,
    organization: organizationsReducer,
    stake_holder: stakeHoldersReducer,
    ticket: ticketsReducer,
    confirmationDialog: confirmationReducer,
    spare: sparesReducer,
    spare_request: spareRequestReducer,
  },
});

export default store;
