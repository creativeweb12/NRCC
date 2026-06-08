export function normalizeUrl(url: string) {
  const cleaned = url
    .replace(
      "https://creativewebgraphic.com/nrccwordpress",
      ""
    )
    .replace(/^\/home$/, "/");

  return cleaned || "/";
}