import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminApp from "./admin/AdminApp";
import { SiteContentProvider } from "./lib/siteContent";
import { ErrorBoundary } from "./components/ErrorBoundary";

const isAdminRoute = window.location.hash.startsWith("#/admin");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <SiteContentProvider>{isAdminRoute ? <AdminApp /> : <App />}</SiteContentProvider>
    </ErrorBoundary>
  </StrictMode>
);
