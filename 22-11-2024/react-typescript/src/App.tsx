import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import ProtectedRoute from "./component/protected-route/ProtectedRoute";

const Login = lazy(() => import("./pages/login/Login"));
const Employees = lazy(() => import("./pages/employees/Employees"));
const Departments = lazy(() => import("./pages/departments/Departments"));
const EmployeeDetails = lazy(
  () => import("./pages/employee-details/EmployeeDetails")
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Employees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/view/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <EmployeeDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
                  <Departments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
