import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layout/Layout";
import ContextApiPage from "./pages/context-api/ContextApiPage";
import { LoadingProvider } from "./context/LoadingContext";
import HigherOrderComponentPage from "./pages/higher-order-component/HigherOrderComponentPage";
import CustomHookPage from "./pages/custom-hook/CustomHookPage";

const App: React.FC = () => {
  return (
    <Router>
      <LoadingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/context-api" />} />
            <Route path="/context-api" element={<ContextApiPage />} />
            <Route path="/hoc" element={<HigherOrderComponentPage />} />
            <Route path="/custom-hook" element={<CustomHookPage />} />
          </Routes>
        </Layout>
      </LoadingProvider>
    </Router>
  );
};

export default App;
