// pages/api/SearchPage.js

export default async function handler(req, res) {
  // Destructure query parameters from the request object
  const { query } = req;

  // Construct the URL for the OMDB API
  const omdbApiKey = process.env.OMDB_API_KEY; // Store your API key in an environment variable
  const baseUrl = "http://www.omdbapi.com/";
  const url = new URL(baseUrl);
  url.searchParams.append("apikey", omdbApiKey);
  url.searchParams.append("type", "series");

  // Append any other query parameters received from the client
  Object.keys(query).forEach((key) => {
    url.searchParams.append(key, query[key]);
  });
  // Fetch data from OMDB API
  fetch(url.toString())
    .then((omdbResponse) => omdbResponse.json())
    .then((data) => {
      const details = {
        title: data.Title,
        imageUrl: data.Poster === "N/A" ? "" : data.Poster,
        director: data.Director,
        writer: data.Writer,
        synopsis: data.Plot,
        runtime: data.Runtime,
        extras: {
          year: data.Year,
          genres: data.Genre,
          actors: data.Actors,
          revenue: data.BoxOffice,
          score: data.imdbRating,
        },
      };
      // Send the data back to the client
      res.status(200).json({ details });
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
      res.status(500).json({ error: "Failed to fetch data from OMDB API" });
    });
}
