import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { movieDetails } from "@/store/detailsSlice/fetchers";
import "./Details.css";
function MangaPage() {
  const details = useSelector((state: any) => state.details.details);
  const searchParams = useSearchParams();
  const type = searchParams && searchParams.get("type");
  const id = searchParams && searchParams.get("id");
  const dispatch = useDispatch();
  useEffect(() => {
    switch (type) {
      case "Movies":
        dispatch(movieDetails({ id }));
        break;
    }
  }, [type]);
  return (
    <main className="mb-10">
      <div className="md:px-40 px-4 lg:flex-row flex-col">
        <section>
          <div className="manga-page-info pb-5 pt-5 gap-4 h-96 ">
            <div className="w-1/5 min-w-32">
              <div className="relative object-cover cover rounded overflow-hidden h-72">
                <Image
                  className="object-cover w-full h-full transition"
                  src={details.imageUrl ? details.imageUrl : ""}
                  alt="Poster"
                  fill
                />
              </div>
              <button className="add-to-list-btn mt-4 mb-4">Add to list</button>
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
                <h5 className="text-xl" style={{ textTransform: "capitalize" }}>
                  {key}
                </h5>
                <p className="text-gray-800 max-w-44">{value}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default MangaPage;
