
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

const WORDPRESS_URL =
  "https://creativewebgraphic.com/nrccwordpress";

export default function ContentPageRoute() {
  const location = useLocation();

  const [page, setPage] = useState(null);
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        setError(false);

        /*
          Current route example:
          /research
          /about-us
        */

        const currentPath =
          location.pathname;

        /*
          GraphQL Request
        */

        const response = await fetch(
          `${WORDPRESS_URL}/graphql`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              query: `
                query GetPage($id: ID!) {
                  page(
                    id: $id
                    idType: URI
                  ) {
                    title
                    content
                    uri
                  }
                }
              `,
              variables: {
                id: currentPath,
              },
            }),
          }
        );

        const result =
          await response.json();

        if (
          result.data &&
          result.data.page
        ) {
          setPage(result.data.page);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(
          "Page Fetch Error:",
          err
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [location.pathname]);

  /*
    Loading State
  */

  if (loading) {
    return (
      <div className="container py-5">
        Loading page...
      </div>
    );
  }

  /*
    Error State
  */

  if (error || !page) {
    return (
      <div className="container py-5">
        <h2>Page Not Found</h2>
      </div>
    );
  }

  /*
    Main Page Layout
  */

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <Breadcrumb page={page} />

          <h1 className="page-title">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
    
<section className="page-layout">

  <div className="container">

    <div className="page-grid">

      {/* Main Content Area */}

      <main className="page-content">

        {page?.content ? (

          <div
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          />

        ) : (

          <p>
            No page content found.
          </p>

        )}

      </main>

      {/* Sidebar Area */}

      <aside className="page-sidebar">

        {/*
          DEBUG
        */}

        {console.log(
          "SIDEBAR MOUNTED"
        )}

        <Sidebar />

      </aside>

    </div>

  </div>

</section>

    </>
  );
}
