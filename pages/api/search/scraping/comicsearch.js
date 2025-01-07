import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  try {
    // Define the URL for scraping
    const url = `https://metron.cloud/series/search?page=${page}&q=${searchTerm}`;

    // Fetch the HTML page content using Axios
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio for scraping
    const $ = cheerio.load(data);

    // Extract titles and next page status
    const titles = [];
    const elements = $(".card");
    const hasNextPage = elements.length > 0;

    elements.each((index, element) => {
      titles.push({
        title: $(element).find(".card-header-title").text().trim(),
        imageUrl: $(element).find("img").attr("src"),
        id: $(element)
          .find(".card-footer-item")
          .eq(1)
          .attr("href")
          .split("/series")[1]
          .replace(/^\/|\/$/g, ""),
      });
    });
    console.log(titles);
    // Send the scraped data as a JSON response
    res.status(200).json({ results: titles, hasNextPage });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
