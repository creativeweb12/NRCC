export async function getLatestNews(limit = 4) {
  const query = `
    query GetLatestNews {
      posts(
        first: ${limit}
        where: {
          categoryName: "LatestNews"
        }
      ) {
        nodes {
          id
          title
          slug
          date
        }
      }
    }
  `;

  const response = await fetch(
    "https://creativewebgraphic.com/nrccwordpress/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  const json = await response.json();

  return json.data.posts.nodes;
}