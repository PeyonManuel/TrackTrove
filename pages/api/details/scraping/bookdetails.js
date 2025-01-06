import puppeteer from "puppeteer";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const browser = await puppeteer.launch();

    // Create a new page
    const newPage = await browser.newPage();

    // Navigate to the URL
    const url = `https://app.thestorygraph.com/books/${id}`;
    await newPage.goto(url);

    const { details } = await newPage.evaluate((page) => {
      const title = document
        .querySelector(".book-title-author-and-series h3")
        ?.firstChild.textContent.trim();
      document.querySelector(".read-more-btn")?.click();
      const synopsis = document
        .querySelector(".blurb-pane .trix-content")
        ?.textContent.trim();
      const imageUrl = document.querySelector(".book-cover img")?.src;
      const details = {
        title,
        synopsis,
        imageUrl,
      };
      return { details };
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
