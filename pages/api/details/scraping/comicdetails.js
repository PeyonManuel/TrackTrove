import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

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
    const url = `https://metron.cloud/series/${id}/`;
    await newPage.goto(url);

    const { details } = await newPage.evaluate((page) => {
      const title = document.getElementsByClassName("title")[0].textContent;
      const synopsis = Array.from(document.getElementsByClassName("box"))
        .find((element) => {
          const title = element.querySelector("h1");
          return title && title.textContent.includes("Summary");
        })
        ?.querySelector("p")?.textContent;
      const imageUrl = Array.from(document.getElementsByClassName("box"))
        .find((element) => {
          const figure = element.querySelector("figure.image.is-2by3");
          return figure && figure.querySelector("img");
        })
        ?.querySelector("img")?.src;
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
