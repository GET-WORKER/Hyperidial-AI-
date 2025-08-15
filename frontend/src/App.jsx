import { useState } from "react";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import RootLayout from "./_lib/_layout/RootLayout";
import FullWidthLayout from "./_lib/_layout/FullWidthLayout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "./_pages/log-in/Login";
import Dashboard from "./_pages/dasboard/dashboard";
import "react-toastify/dist/ReactToastify.css";
import AnsweredStatus from "./_pages/current status/current-status";
import RespondedClients from "./_pages/responded-clients/responded-clients";
import UnRespondedClients from "./_pages/un-responded-clients/un-responded-clients";
import Dashboard2 from "./_pages/dashboard2/dashboard2";

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
            <Route path="/current-status" element={<AnsweredStatus />} />
            <Route path="/responded-clients" element={<RespondedClients />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
            <Route
              path="/un-responded-clients"
              element={<UnRespondedClients />}
            />

            <Route path="/" element={<Dashboard />} />
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
