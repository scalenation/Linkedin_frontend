import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginRegister from "pages/login-register";
import Dashboard from "pages/dashboard";
import ContentGeneration from "pages/content-generation";
import ContentCalendar from "pages/content-calendar";
import AnalyticsDashboard from "pages/analytics-dashboard";
import SettingsConfiguration from "pages/settings-configuration";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content-generation" element={<ContentGeneration />} />
          <Route path="/content-calendar" element={<ContentCalendar />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/settings-configuration" element={<SettingsConfiguration />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;