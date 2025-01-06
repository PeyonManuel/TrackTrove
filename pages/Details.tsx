import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { tvDetails } from "@/store/detailsSlice/fetchers";
import { movieDetails } from "@/store/detailsSlice/fetchers";
import { bookDetails } from "@/store/detailsSlice/fetchers";
import { gameDetails } from "@/store/detailsSlice/fetchers";
import { mangaDetails } from "@/store/detailsSlice/fetchers";
import { comicDetails } from "@/store/detailsSlice/fetchers";
import "./Details.css";
import { detailsState } from "@/store/detailsSlice/reducers";
function MangaPage() {
  const details = useSelector((state: detailsState) => state.details.details);
  const error = useSelector((state: detailsState) => state.details.error);
  const detailsLoading = useSelector(
    (state: detailsState) => state.details.detailsLoading
  );
  const searchParams = useSearchParams();
  const type = searchParams && searchParams.get("type");
  const id = searchParams && searchParams.get("id");
  const dispatch = useDispatch<any>();
  const detailFunctions: Record<string, Function> = {
    tv: tvDetails,
    movies: movieDetails,
    books: bookDetails,
    games: gameDetails,
    mangas: mangaDetails,
    comics: comicDetails,
  };

  useEffect(() => {
    if (!type || !id) return;
    dispatch(detailFunctions[type]({ id }));
  }, [type]);

  return (
    <main
      className={`mb-10 min-h-screen ${
        error || detailsLoading ? "flex items-center justify-center" : ""
      }`}
    >
      {detailsLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-300 to-pink-300">
          <div className="w-24 h-24 border-8 border-solid border-t-8 border-blue-600 rounded-full animate-spin comic-shadow">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-2xl text-white font-extrabold tracking-widest animate-bounce">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg font-bold text-center max-w-[50vw] mx-auto">
          {error}
        </div>
      ) : (
        <div className="md:px-40 px-4 lg:flex-row flex-col">
          <section>
            <div className="manga-page-info pb-5 pt-5 gap-4 h-96 ">
              <div className="w-1/5 min-w-32">
                <div className="relative object-cover cover rounded overflow-hidden h-72">
                  <Image
                    className="object-cover w-full h-full transition"
                    src={details.imageUrl ? details.imageUrl : ""}
                    alt="Poster"
                    width={3000}
                    height={3000}
                  />
                </div>
                <button className="add-to-list-btn mt-4 mb-4">
                  Add to list
                </button>
              </div>
              <div className="manga-page-info__text w-4/5 h-fit">
                <h1 className="text-4xl">{details.title}</h1>
                {details.runtime && (
                  <p className="text-base">{details.runtime}</p>
                )}
                {(details.director || details.writer) && (
                  <div>
                    <p className="text-lg">
                      {details.director && `Director: ${details.director}`}
                      {details.director && details.writer && " | "}
                      {details.writer && `Writer: ${details.writer}`}
                    </p>
                  </div>
                )}
                <p className="text-sm mt-4">
                  {details.synopsis ? details.synopsis : "No synopsis"}
                </p>
              </div>
            </div>
          </section>
          <div className="info-chapters__extra-info gap-10">
            {details.extras &&
              Object.entries(details.extras).map(([key, value]) => (
                <div className="info-chapters__extra-info__item">
                  <h5
                    className="text-xl"
                    style={{ textTransform: "capitalize" }}
                  >
                    {key}
                  </h5>
                  <p className="text-gray-800 max-w-44">{value as string}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default MangaPage;
