import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

export default async (req, res) => {
  const {
    query: { page },
  } = req;

  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    // Create a new page
    const newPage = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/games/lib/popular?page=${page}`;
    await newPage.goto(url);
    const { titles, hasNextPage } = await newPage.evaluate(() => {
      const baseURL = "https://www.backloggd.com/games/";
      const titles = [];
      const elements = document.querySelectorAll(".col-2");
      const hasNextPage = elements.length > 0;
      elements.forEach((element) => {
        titles.push({
          title: element
            .querySelector(".game-text-centered")
            .textContent.trim(),
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
    res.status(500).json({ error: error.message });
  }
};
