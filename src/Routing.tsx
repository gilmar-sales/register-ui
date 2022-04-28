import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginEnvironment from "./atomic/environments/Login";

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
