import { useState } from "react";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import RootLayout from "./_lib/_layout/RootLayout";
import FullWidthLayout from "./_lib/_layout/FullWidthLayout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "./_pages/log-in/Login";
import Products from "./_pages/products/products/products-Layout";
import Tags from "./_pages/products/tags/tags-Layout";
import Customers from "./_pages/people/customers/customer-Layout";
import Users from "./_pages/people/users/users-Layout";
import Spares from "./_pages/products/spares/spares-Layout";
import Projects from "./_pages/projects/projects/projects-Layout";
import Teams from "./_pages/projects/teams/teams-Layout";
import ServiceCenter from "./_pages/projects/service-center/service-center-Layout";
import Organization from "./_pages/people/organizations/organizations-Layout";
import StackHolders from "./_pages/people/stake-holders/stake-holders-Layout";
import Tickets from "./_pages/tickets/tickets/tickets-Layout";
import Dashboard from "./_pages/dasboard/dashboard";
import BirtReportViewer from "./_pages/reports/birt-report-viewer";
import SpareRequest from "./_pages/tickets/spare-requests/spare-request-layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        {/* Private Routes */}
        {isAuthenticated && (
          <Route element={<RootLayout />}>
            <Route path="/products" element={<Products />} />
            <Route path="/spares" element={<Spares />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/service-centers" element={<ServiceCenter />} />
            <Route path="/service-centers" element={<ServiceCenter />} />
            <Route path="/organizations" element={<Organization />} />
            <Route path="/spare-requests" element={<SpareRequest />} />
            <Route path="/tickets" element={<Tickets />} />

            <Route path="/" element={<Dashboard />} />
          </Route>
        )}
        {isAuthenticated && (
          <Route element={<FullWidthLayout />}>
            <Route
              path="/reports/ticket-status-overview"
              element={<BirtReportViewer reportName="ticket_status_overview" />}
            />
            <Route
              path="/reports/workload-distribution"
              element={<BirtReportViewer reportName="workload_distribution" />}
            />
            <Route
              path="/reports/ticket-aging"
              element={<BirtReportViewer reportName="ticket_aging" />}
            />
            <Route
              path="/reports/pending-approvals"
              element={<BirtReportViewer reportName="pending_approvals" />}
            />
            <Route
              path="/reports/technician-performance"
              element={<BirtReportViewer reportName="technician_performance" />}
            />
            <Route
              path="/reports/reopened-tickets"
              element={<BirtReportViewer reportName="reopened_tickets" />}
            />
            <Route
              path="/reports/service-request-fulfillment"
              element={
                <BirtReportViewer reportName="service_request_fulfillment" />
              }
            />
            <Route
              path="/reports/change-request"
              element={<BirtReportViewer reportName="change_request" />}
            />
            <Route
              path="/reports/incident-management"
              element={<BirtReportViewer reportName="incident_management" />}
            />
            <Route
              path="/reports/ticket-closure-details"
              element={<BirtReportViewer reportName="ticket_closure_details" />}
            />
            <Route
              path="/reports/spare-parts-management"
              element={<BirtReportViewer reportName="spare_parts_management" />}
            />
            <Route
              path="/reports/sla-compliance"
              element={<BirtReportViewer reportName="sla_compliance" />}
            />
            <Route
              path="/reports/recent-activity"
              element={<BirtReportViewer reportName="recent_activity" />}
            />
            <Route
              path="/reports/top-technicians"
              element={<BirtReportViewer reportName="top_technicians" />}
            />
          </Route>
        )}
        {/* redirects */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
