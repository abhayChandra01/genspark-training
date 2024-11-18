import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import UserDetails from "./pages/user-details/UserDetails";
import EmployeeData from "./pages/employee-data/EmployeeData";
import TodoList from "./pages/todo-list/TodoList";
import CustomerDetails from "./pages/customer-details/CustomerDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/user-details" />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/employee-data" element={<EmployeeData />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
