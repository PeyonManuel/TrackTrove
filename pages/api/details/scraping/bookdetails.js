import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    // Build the URL for the specific book
    const url = `https://app.thestorygraph.com/books/${id}`;

    // Fetch the HTML of the page
    const { data } = await axios.get(url);
    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Scrape the book details
    const title = $(".book-title-author-and-series h3").first().text().trim();
    const synopsis = $(".trix-content")
      .first() // Ensures we're targeting the first relevant div with the class "trix-content"
      .text()
      .trim();

    const imageUrl = $(".book-cover img").attr("src");

    const details = {
      title,
      synopsis,
      imageUrl,
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
