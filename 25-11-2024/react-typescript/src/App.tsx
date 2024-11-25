import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import Employees from "./pages/employees/Employees";
import Vehicle from "./pages/vehicle/Vehicle";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/vehicles" element={<Vehicle />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
