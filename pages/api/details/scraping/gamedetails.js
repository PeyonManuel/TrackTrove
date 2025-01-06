import puppeteer from "puppeteer";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const newPage = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.backloggd.com/games/${id}`;
    await newPage.goto(url);

    const details = await newPage.evaluate(() => {
      const title = document.querySelector("#title h1")?.textContent.trim();
      const imageUrl = document.querySelector(".game-cover img")?.src;
      const synopsis = document
        .querySelector("#collapseSummary p")
        ?.textContent.trim();

      return { title, imageUrl, synopsis };
    });

    // Close the browser
    await browser.close();

    // Send the scraped data as a JSON response
    res.status(200).json({ details });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the data." });
  }
};
