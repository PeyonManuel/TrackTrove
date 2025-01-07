import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    // Build the URL for the specific game
    const url = `https://www.backloggd.com/games/${id}`;

    // Fetch the HTML content from the URL
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Scrape the title, image URL, and synopsis
    const title = $("#title h1").text().trim();
    const imageUrl = $(".game-cover img").attr("src");
    const synopsis = $("#collapseSummary p").text().trim();

    // Package the scraped details
    const details = {
      title,
      imageUrl,
      synopsis,
    };

    // Send the scraped data as a JSON response
    res.status(200).json({ details });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
