import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const newPage = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/search/games/${searchTerm}?&page=${page}`;
    await newPage.goto(url);

    const { titles, hasNextPage } = await newPage.evaluate(() => {
      const baseURL = "https://www.backloggd.com/games/";
      const titles = [];
      const elements = document.querySelectorAll(".result");
      const hasNextPage = elements.length > 0;
      elements.forEach((element) => {
        titles.push({
          title: element.querySelector("h3").textContent.trim(),
          imageUrl: element.querySelector(".card-img").src,
          id: element
            .querySelector("a")
            .href.substring(baseURL.length)
            .replace(/\//g, ""),
        });
      });

      return { titles, hasNextPage };
    });

    // Close the browser
    await browser.close();

    // Send the scraped data as a JSON response
    res.status(200).json({ results: titles, hasNextPage });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
