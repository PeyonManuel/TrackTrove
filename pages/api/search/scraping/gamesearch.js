import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  try {
    // Define the URL for scraping
    const url = `https://www.backloggd.com/search/games/${searchTerm}?&page=${page}`;

    // Fetch the HTML page content using Axios
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio for scraping
    const $ = cheerio.load(data);

    // Extract titles and next page status
    const titles = [];
    const elements = $(".result");
    const hasNextPage = elements.length > 0;

    elements.each((index, element) => {
      titles.push({
        title: $(element).find("h3").text().trim(),
        imageUrl: $(element).find(".card-img").attr("src"),
        id: $(element)
          .find("a")
          .attr("href")
          .replace(/^\/games\//, ""),
      });
    });

    // Send the scraped data as a JSON response
    res.status(200).json({ results: titles, hasNextPage });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
