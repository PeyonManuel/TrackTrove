import axios from "axios";
import * as cheerio from "cheerio";

export default async (req, res) => {
  const {
    query: { page },
  } = req;

  if (!page) {
    return res.status(400).json({ error: "Page parameter is required" });
  }

  try {
    // Fetch the page content
    const { data } = await axios.get(
      `https://www.backloggd.com/games/lib/popular?page=${page}`
    );
    const $ = cheerio.load(data);

    const titles = [];
    const baseURL = "https://www.backloggd.com/games/";

    // Extract game data
    $(".col-2").each((i, element) => {
      const title = $(element).find(".game-text-centered").text().trim();
      const imageUrl = $(element).find(".card-img").attr("src");
      const id = $(element)
        .find("a")
        .attr("href")
        .substring(baseURL.length)
        .replace(/\//g, "");

      titles.push({ title, imageUrl, id });
    });

    res.status(200).json({ results: titles, hasNextPage: titles.length > 0 });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Error during scraping", details: error.message });
  }
};
