import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import HomePage from "./pages/HomePage";
import ContentPageRoute from "./pages/ContentPageRoute";

import "./styles/index.css";

function MainLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ContentPageRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
