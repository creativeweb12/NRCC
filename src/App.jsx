import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./styles/index.css";

import HomePage from "./pages/HomePage";
import ContentPageRoute from "./pages/ContentPageRoute";

import Header from "./components/Header";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
// import { Navbar } from "./components/Navbar";

/*
-----------------------------------
Main Layout
-----------------------------------
*/

function MainLayout() {
  console.log(
    "MAIN LAYOUT LOADED"
  );

  return (
    <>
      {/* Top Government Header */}
      <SiteHeader />

      {/* Main Header */}
      <Header />

      {/* Responsive Navigation */}
      {/* <Navbar /> */}

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
  console.log(
    "APP LOADED"
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route
          element={<MainLayout />}
        >

          {/* Home Page */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Dynamic WordPress Pages */}
          <Route
            path="*"
            element={
              <ContentPageRoute />
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}