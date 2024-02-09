// pages/api/SearchPage.js

export default async function handler(req, res) {
  // Destructure query parameters from the request object
  const { query } = req;

  // Construct the URL for the OMDB API
  const omdbApiKey = process.env.OMDB_API_KEY; // Store your API key in an environment variable
  const baseUrl = "http://www.omdbapi.com/";
  const url = new URL(baseUrl);
  url.searchParams.append("apikey", omdbApiKey);

  // Append any other query parameters received from the client
  Object.keys(query).forEach((key) => {
    url.searchParams.append(key, query[key]);
  });
  try {
    // Fetch data from OMDB API
    const omdbResponse = await fetch(url.toString());
    const data = await omdbResponse.json();
    console.log(data);
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
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Failed to fetch data from OMDB API" });
  }
}
