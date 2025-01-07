export default async (req, res) => {
  const {
    query: { page },
  } = req;

  // Log page query to verify input
  console.log("Page:", page);

  // Check if the page query parameter exists
  if (!page) {
    return res.status(400).json({ error: "Page parameter is required" });
  }

  let browser;
  let context;
  let pageInstance;
  let titles = [];
  let hasNextPage = false;

  try {
    const playwright = require("playwright");

    // Launch the browser
    browser = await playwright.chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Create a new browser context and page
    context = await browser.newContext();
    pageInstance = await context.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/games/lib/popular?page=${page}`;
    console.log(`Navigating to: ${url}`);
    await pageInstance.goto(url); // 30 seconds timeout

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

    // Log the result before returning it
    console.log("Scraped data:", { titles, hasNextPage });

    // Send the scraped data as a JSON response
    res.status(200).json({ results: titles, hasNextPage });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error.message);

    // Return a 500 error with details
    res
      .status(500)
      .json({ error: "Error during scraping", details: error.message });
  } finally {
    // Clean up and close the browser
    if (browser) {
      await browser.close();
    }
  }
};
