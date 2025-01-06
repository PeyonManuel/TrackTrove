// pages/api/SearchPage.js

export default async function handler(req, res) {
  // Destructure query parameters from the request object
  const {
    query: { id },
  } = req;
  var query = `
  query ($id: Int) {
      Media (id: $id, type: MANGA) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
        genres
        description
        averageScore
        popularity
        tags {
          name
        }
        volumes
      }
  }
  `;

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
          id,
        },
      }),
    };

  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data.Media);
      const data = response.data.Media;
      const details = {
        title: data.title.english || data.title.romaji,
        imageUrl: data.coverImage.extraLarge || data.coverImage.large || "",
        id: data.id,
      };
      res.status(200).json({ details });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while scraping the data." });
    });
}
