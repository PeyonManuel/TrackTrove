import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  try {
    // Define the URL for scraping
    const url = `https://app.thestorygraph.com/browse?search_term=${searchTerm}&page=${page}`;

    // Fetch the HTML page content using Axios
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio for scraping
    const $ = cheerio.load(data);

    // Extract titles and next page status
    const titles = [];
    const elements = $(".book-pane");
    const hasNextPage = elements.length > 0;

    elements.each((index, element) => {
      let isMangaOrComic = false;
      const tags = $(element).find(".book-pane-tag-section");

      tags.each((_, tag) => {
        const tagText = $(tag).text().toLowerCase().trim();
        if (
          tagText.includes("manga") ||
          tagText.includes("comics") ||
          tagText.includes("graphic novel")
        ) {
          isMangaOrComic = true;
        }
      });

      if (!isMangaOrComic) {
        const title = $(element)
          .find(".book-title-author-and-series a")
          .text()
          .trim();
        const imageUrl = $(element).find("img").attr("src");
        const id = $(element)
          .find(".book-title-author-and-series h1 a")
          .attr("href")
          ?.split("/")[2];

        titles.push({
          title,
          imageUrl,
          id,
        });
      }
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
