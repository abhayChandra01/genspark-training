import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import BankApp from "./pages/bank-app/BankApp";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import JsonServerPage from "./pages/json-server/JsonServerPage";
import ProductsPage from "./pages/products-page/ProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/bank-app" />} />
            <Route path="/bank-app" element={<BankApp />} />
            <Route path="/json-server" element={<JsonServerPage />} />
            <Route path="/products-page" element={<ProductsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
