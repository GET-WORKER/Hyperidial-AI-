import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isExpanded: false,
    isOpen: false,
    menuItems: [
      {
        name: "Tickets",
        url: "tickets",
        isOpen: false,
        subItems: [
          { name: "Tickets", url: "tickets" },
          { name: "Spare Requests", url: "spare-requests" },
        ],
      },
      {
        name: "Projects",
        url: "projects",
        isOpen: false,
        subItems: [
          { name: "Projects", url: "projects" },
          { name: "Teams", url: "teams" },
          { name: "Service centers", url: "service-centers" },
        ],
      },
      {
        name: "People",
        url: "customers",
        isOpen: false,
        subItems: [
          { name: "Customers", url: "customers" },
          // { name: "Stakeholders", url: "stake-holders" },
          // { name: "Organisations", url: "organizations" },
          { name: "Users", url: "users" },
        ],
      },
      {
        name: "Products",
        url: "products",
        isOpen: false,
        subItems: [
          { name: "Products", url: "products" },
          { name: "Spares", url: "spares" },
          { name: "Tags", url: "tags" },
        ],
      },
      {
        name: "Reports",
        url: "",
        isOpen: false,
        subItems: [
          {
            name: "Ticket Status Overview",
            url: "/reports/ticket-status-overview",
          },
          {
            name: "Workload Distribution",
            url: "/reports/workload-distribution",
          },
          {
            name: "Ticket Aging",
            url: "/reports/ticket-aging",
          },
          {
            name: "Pending Approvals",
            url: "/reports/pending-approvals",
          },
          {
            name: "Technician Performance",
            url: "/reports/technician-performance",
          },
          {
            name: "Reopened Tickets",
            url: "/reports/reopened-tickets",
          },
          {
            name: "Service Request Fulfillment",
            url: "/reports/service-request-fulfillment",
          },
          {
            name: "Change Request",
            url: "/reports/change-request",
          },
          {
            name: "Incident Management",
            url: "/reports/incident-management",
          },
          {
            name: "Ticket Closure Details",
            url: "/reports/ticket-closure-details",
          },
          {
            name: "Spare Parts Management",
            url: "/reports/spare-parts-management",
          },
          {
            name: "SLA Compliance",
            url: "/reports/sla-compliance",
          },
          {
            name: "Recent Activity",
            url: "/reports/recent-activity",
          },
          {
            name: "Top Technicians",
            url: "/reports/top-technicians",
          },
        ],
      },
    ],
  },
  reducers: {
    logout: (state) => {
      state.isExpanded = true;
    },
    toggleMenu: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { logout, toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
