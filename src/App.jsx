import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./styles/index.css";

import HomePage from "./pages/HomePage";
import ContentPageRoute from "./pages/ContentPageRoute";
import LatestNews from "./pages/LatestNews";  

import Header from "./components/Header";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";

/*
-----------------------------------
Main Layout
-----------------------------------
*/

function MainLayout() {
  console.log("MAIN LAYOUT LOADED");

  return (
    <>
      {/* Top Government Header */}
      <SiteHeader />

      {/* Main Header */}
      <Header />

      {/* Main Content */}
      <main
        id="main-content"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}

/*
-----------------------------------
App
-----------------------------------
*/

export default function App() {
  console.log("APP LOADED");

  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>

          {/* Home Page */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Latest News */}
          <Route
            path="/latest-news"
            element={<LatestNews />}
          />

          {/* Dynamic WordPress Pages */}
          <Route
            path="*"
            element={<ContentPageRoute />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}