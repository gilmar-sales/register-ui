import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import RegistersPage from "../pages/Registers";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute role="collaborator" />}>
          <Route path="/registers" element={<RegistersPage />} />
        </Route>
        <Route element={<ProtectedRoute role="administrator" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
