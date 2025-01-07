export default async (req, res) => {
  const {
    query: { page },
  } = req;

  if (!page) {
    return res.status(400).json({ error: "Page parameter is required" });
  }

  let browser;
  let context;
  let pageInstance;
  let titles = [];
  let hasNextPage = false;

  try {
    const playwright = require("playwright-core");
    const chrome = require("chrome-aws-lambda");

    // Launch the browser with correct options
    browser = await playwright.chromium.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      ignoreHTTPSErrors: true,
    });

    // Create a new browser context and page
    context = await browser.newContext();
    pageInstance = await context.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/games/lib/popular?page=${page}`;
    await pageInstance.goto(url, { timeout: 30000 });

    // Extract titles and next page status
    const result = await pageInstance.evaluate(() => {
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

    titles = result.titles;
    hasNextPage = result.hasNextPage;

    // Send the scraped data as a JSON response
    res.status(200).json({ results: titles, hasNextPage });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Error during scraping", details: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
