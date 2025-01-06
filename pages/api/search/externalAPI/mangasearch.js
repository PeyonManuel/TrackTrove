export default async (req, res) => {
  const {
    query: { searchTerm, page },
  } = req;

  var query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search, type: MANGA) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
  `;
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
        variables: {
          search: searchTerm,
          page: page,
          perPage: 36,
        },
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
