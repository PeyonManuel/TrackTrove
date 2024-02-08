import puppeteer from "puppeteer";

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
    const url = `https://metron.cloud/series/SearchPage?page=${page}&q=${searchTerm}`;
    await newPage.goto(url);

    const { titles, hasNextPage } = await newPage.evaluate((page) => {
      const titles = [];
      const elements = document.querySelectorAll(".card");
      const hasNextPage = elements.length > 0;
      elements.forEach((element) => {
        titles.push({
          title: element.querySelector(".card-header-title").textContent.trim(),
          imageUrl: element.querySelector("img").src,
          link: element.querySelectorAll(".card-footer-item")[1].href,
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
