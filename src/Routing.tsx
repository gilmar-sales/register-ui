import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginEnvironment from "./pages/Login";

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginEnvironment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
