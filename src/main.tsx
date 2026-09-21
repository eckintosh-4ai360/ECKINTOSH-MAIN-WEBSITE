import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminApp from "./admin/AdminApp";
import { SiteContentProvider } from "./lib/siteContent";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PrivacyPolicy } from "./legal/PrivacyPolicy";
import { TermsOfService } from "./legal/TermsOfService";

const hash = window.location.hash;
const isAdminRoute = hash.startsWith("#/admin");
const isPrivacyRoute = hash.startsWith("#/privacy");
const isTermsRoute = hash.startsWith("#/terms");

function renderRoute() {
  if (isAdminRoute) return <AdminApp />;
  if (isPrivacyRoute) return <PrivacyPolicy />;
  if (isTermsRoute) return <TermsOfService />;
  return <App />;
}

// The legal pages are static and don't need site content; everything else does.
const needsSiteContent = !isPrivacyRoute && !isTermsRoute;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      {needsSiteContent ? (
        <SiteContentProvider>{renderRoute()}</SiteContentProvider>
      ) : (
        renderRoute()
      )}
    </ErrorBoundary>
  </StrictMode>
);
