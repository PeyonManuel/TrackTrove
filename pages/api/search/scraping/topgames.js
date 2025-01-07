export default async (req, res) => {
  const {
    query: { page },
  } = req;

  let browser;
  let browserOptions = {};

  // Set up for running in serverless environments like AWS Lambda or Vercel
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    const playwright = require("playwright-aws-lambda");
    browser = await playwright.chromium.launch({
      args: [...playwright.args, "--hide-scrollbars", "--disable-web-security"],
      headless: true,
    });
  } else {
    const playwright = require("playwright");
    browser = await playwright.chromium.launch({
      headless: true,
    });
  }

  try {
    // Create a new browser page
    const page = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/games/lib/popular?page=${page}`;
    await page.goto(url);

    // Scrape data from the page
    const { titles, hasNextPage } = await page.evaluate(() => {
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
