import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    // Build the URL for the specific series
    const url = `https://metron.cloud/series/${id}/`;

    // Fetch the HTML content from the URL
    const { data } = await axios.get(url);
    console.log(data);
    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Scrape the title
    const title = $(".title").first().text().trim();

    // Scrape the synopsis from the "Summary" section
    const synopsis = $(".box")
      .find("h1")
      .filter((i, el) => $(el).text().includes("Summary"))
      .closest(".box")
      .find("p")
      .text()
      .trim();

    // Scrape the image URL
    const imageUrl = $(".box")
      .find("figure.image.is-2by3")
      .find("img")
      .attr("src");

    // Package the scraped details
    const details = {
      title,
      synopsis,
      imageUrl,
    };
    console.log(details);
    // Send the scraped data as a JSON response
    res.status(200).json({ details });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
