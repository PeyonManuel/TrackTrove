/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "static.metron.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.igdb.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.thestorygraph.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.thestorygraph.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
      },
    ],
  },
};
