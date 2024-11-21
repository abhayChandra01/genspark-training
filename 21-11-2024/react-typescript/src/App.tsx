import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CustomerDetails from "./pages/customer-details/CustomerDetails";
import TopCustomers from "./pages/top-customers/TopCustomers";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/top-customers" element={<TopCustomers />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
