// pages/api/SearchPage.js

export default async function handler(req, res) {
  // Destructure query parameters from the request object
  const { query } = req;

  // Construct the URL for the OMDB API
  const omdbApiKey = process.env.OMDB_API_KEY; // Store your API key in an environment variable
  const baseUrl = "http://www.omdbapi.com/";
  const url = new URL(baseUrl);
  url.searchParams.append("apikey", omdbApiKey);
  url.searchParams.append("type", "Movie");

  // Append any other query parameters received from the client
  Object.keys(query).forEach((key) => {
    url.searchParams.append(key, query[key]);
  });

  try {
    // Fetch data from OMDB API
    const omdbResponse = await fetch(url.toString());
    const data = await omdbResponse.json();
    const results = [];
    const search = data.Search;
    search.forEach((movie) => {
      results.push({
        title: movie.Title,
        imageUrl: movie.Poster === "N/A" ? "" : movie.Poster,
        id: movie.imdbID,
      });
    });
    const hasNextPage = results.length > 0;
    // Send the data back to the client
    res.status(200).json({ results, hasNextPage });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Failed to fetch data from OMDB API" });
  }
}
