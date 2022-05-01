import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import RegistersPage from "../pages/Registers";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
