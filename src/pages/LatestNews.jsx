import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

import "./latest-news.css";

const WORDPRESS_URL = "https://creativewebgraphic.com/nrccwordpress/graphql";

export default function LatestNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const query = `
query GetLatestNews {
  posts(
    where: {
      categoryName: "LatestNews"
    }
    first: 20
  ) {
    nodes {
      id
      title
      excerpt
      slug
      date

      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;
      const response = await fetch(WORDPRESS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const json = await response.json();

      setPosts(json.data.posts.nodes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading">
        Loading Latest News...
      </div>
    );
  }

  return (
  <>
    {/* Breadcrumb Section */}
    <section className="page-header">
      <div className="container">

        <Breadcrumb />

        <h1 >
          Latest News
        </h1>

      </div>
    </section>

    {/* Main Content */}
    <section className="page-content">
      <div className="container news-layout">

        {/* LEFT */}
        <main className="news-main">
          {posts.map((post) => (
            <article
              key={post.id}
              className="news-card"
            >
              <div className="news-image">
                <img
                  src={
                    post.featuredImage?.node?.sourceUrl ||
                    "/placeholder.jpg"
                  }
                  alt={post.title}
                />
              </div>

              <div className="news-content">

                <div className="news-date">
                  {new Date(post.date).toLocaleDateString()}
                </div>

                <h2
                  dangerouslySetInnerHTML={{
                    __html: post.title,
                  }}
                />

                <div
                  className="news-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt,
                  }}
                />

                <Link
                  to={`/${post.slug}`}
                  className="read-more"
                >
                  Read More →
                </Link>

              </div>
            </article>
          ))}
        </main>

        {/* RIGHT */}
        <aside className="news-sidebar">
          <Sidebar />
        </aside>

      </div>
    </section>
  </>
);
}