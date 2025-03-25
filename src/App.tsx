// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./modules/user/presentation/web/screens/LoginPage";
import SignUpPage from "./modules/user/presentation/web/screens/SignUpPage";
import ProtectedData from "./modules/user/presentation/web/components/ProtectedData";
import GoogleForm from "./modules/user/presentation/web/components/GoogleForm";
const App: React.FC = () => {
  return (
    <Routes>
    <Route path="/" element={<LoginPage />} /> // 👈 esta debe ser la ruta raíz
    <Route path="/register" element={<SignUpPage />} />
    <Route path="/protected" element={<ProtectedData />} />
    <Route path="/google" element={<GoogleForm />} />

    </Routes>
  );
};

export default App;
