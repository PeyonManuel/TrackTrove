import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import "./Details.css";
import { useDispatch } from "react-redux";
import { movieDetails } from "@/store/detailsSlice/fetchers";
function MangaPage() {
  const searchParams = useSearchParams();
  const type = searchParams && searchParams.get("type");
  const id = searchParams && searchParams.get("id");
  const dispatch = useDispatch();
  switch (type) {
    case "movie":
      dispatch(movieDetails({ id }));
      break;
  }
  return (
    <main className="mb-10">
      <section className="poster">
        <div
          className="img-div"
          style={{
            backgroundImage:
              "url(https://s4.anilist.co/file/anilistcdn/media/manga/banner/30013-hbbRZqC5MjYh.jpg)",
            width: "100%", // Ensure this div has a set size
            height: "400px", // Adjust height as necessary
            backgroundSize: "cover", // Cover the entire area of the div
            backgroundPosition: "center", // Center the background image
          }}
        ></div>
      </section>
      <div className="md:px-40 px-4">
        <section>
          <div className="manga-page-info">
            <div>
              <div className="manga-page-info__img img-div">
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-tZVlfBCHbrNL.jpg"
                  alt="Poster"
                  width={300}
                  height={500}
                  layout="responsive"
                />
              </div>
              <button className="add-to-list-btn mt-4 mb-4">Add to list</button>
            </div>
            <div className="manga-page-info__text">
              <h1 className="text-2xl">One Piece</h1>
              <p className="text-sm">
                As a child, Monkey D. Luffy was inspired to become a pirate by
                listening to the tales of the buccaneer "Red-Haired" Shanks. But
                his life changed when Luffy accidentally ate the Gum-Gum Devil
                Fruit and gained the power to stretch like rubber...at the cost
                of never being able to swim again! Years later, still vowing to
                become the king of the pirates, Luffy sets out on his
                adventure...one guy alone in a rowboat, in search of the
                legendary "One Piece," said to be the greatest treasure in the
                world...
                <br />
                <br />
                (Source: Viz Media)
              </p>
            </div>
          </div>
        </section>
        <div className="info-chapters__extra-info gap-10">
          <div className="info-chapters__extra-info__item">
            <h5 className="text-xl">Status</h5>
            <p className="text-gray-800">RELEASING</p>
          </div>
          <div className="info-chapters__extra-info__item">
            <h5 className="text-xl">Start Date</h5>
            <p className="text-gray-800">July 22, 1997</p>
          </div>
          <div className="info-chapters__extra-info__item">
            <h5 className="text-xl">Average Score</h5>
            <p className="text-gray-800">91%</p>
          </div>
          <div className="info-chapters__extra-info__item">
            <h5 className="text-xl">Genres</h5>
            <p className="text-gray-800">Action, Adventure, Comedy, Fantasy</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MangaPage;
