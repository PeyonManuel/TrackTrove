export default async (req, res) => {
  const {
    query: { page },
  } = req;

  var query = `{
        Page (page: ${page}, perPage: 36) {
            pageInfo {
                hasNextPage
            }
        media (type: MANGA, format: MANGA, sort: TRENDING_DESC) {
            id
          title {
            english
            romaji
          }
          averageScore
          coverImage {
              extraLarge
          }
        }
    }
      }`;
  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  // Make the HTTP Api request
  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data.Page.media;
      const results = [];
      const hasNextPage = response.data.Page.pageInfo.hasNextPage;
      for (let i = 0; i < data.length; i++) {
        results.push({
          title: data[i].title.english || data[i].title.romaji,
          imageUrl:
            data[i].coverImage.extraLarge || data[i].coverImage.large || "",
          id: data[i].id,
        });
      }
      res.status(200).json({ results, hasNextPage });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while scraping the data." });
    });
};
