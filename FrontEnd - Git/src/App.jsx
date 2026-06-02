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

      <SiteHeader />

      <Header />

      <main
        id="main-content"
        tabIndex={-1}
      >

        {/* ROUTE CONTENT */}

        <Outlet />

      </main>

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

          {/* Home */}

          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Dynamic Pages */}

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
