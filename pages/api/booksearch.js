import puppeteer from "puppeteer";

export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  try {
    const browser = await puppeteer.launch();

    // Create a new page
    const newPage = await browser.newPage();

    // Navigate to the URL
    const url = `https://app.thestorygraph.com/browse?search_term=${searchTerm}&page=${page}`;
    await newPage.goto(url);

    const { titles, hasNextPage } = await newPage.evaluate((page) => {
      const titles = [];
      var elements = document.querySelectorAll(".book-pane");
      const hasNextPage = elements.length > 0;
      elements.forEach((element) => {
        tags = element.querySelectorAll(".book-pane-tag-section");
        isMangaOrManga = false;
        tags.forEach((tag) => {
          tag = tag.innerText.toLowerCase().trim();
          if (
            tag.includes("manga") ||
            tag.includes("comics") ||
            tag.includes("graphic novel")
          )
            isMangaOrManga = true;
        });
        if (!isMangaOrManga) {
          title = element
            .querySelector(".book-title-author-and-series")
            .querySelector("a")
            .innerText.trim();
          imageUrl = element.querySelector("img").src;
          link = element
            .querySelector(".book-title-author-and-series")
            .querySelector("a").href;
          titles.push({
            title,
            imageUrl,
            link,
          });
        }
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
