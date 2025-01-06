"use client";

import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import DownChevron from "../components/icons/DownChevron";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { useDispatch, useSelector } from "react-redux";
import LoadingCard from "../components/LoadingCard";
import { clearSearchResults } from "../store/searchSlice/actions";
import {
  searchBooks,
  searchComics,
  searchGames,
  searchManga,
  searchMovies,
  searchTv,
  topGames,
  topManga,
} from "@/store/searchSlice/fetchers";
import { options } from "@/constants";

const SearchPage = () => {
  type OptionName = { name: string; id: string };
  const [selectedOption, setSelectedOption] = React.useState<OptionName>(
    options[0]
  );
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searched, setSearched] = React.useState(false);

  const searchLoading = useSelector(
    (state: any) => state.search.searchLoading[selectedOption.id]
  );
  const searchResults = useSelector(
    (state: any) => state.search.searchResults[selectedOption.id]
  );
  const hasNextPage = useSelector(
    (state: any) => state.search.hasNextPage[selectedOption.id]
  );

  const dispatch = useDispatch();
  console.log(searchResults);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastResultElement = useCallback(
    (node: any) => {
      if (searchLoading || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          nextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [searchLoading, hasNextPage]
  );

  const loadingCards = () =>
    Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />);

  const fetchFunctions: Record<string, Function> = {
    tv: searchTv,
    movies: searchMovies,
    books: searchBooks,
    games: searchGames,
    mangas: searchManga,
    comics: searchComics,
  };

  const handleFetch = (page: number, isSearch: boolean) => {
    const fetchFunction = fetchFunctions[selectedOption.id];
    if (fetchFunction) {
      if (selectedOption.id === "games" || selectedOption.id === "mangas") {
        isSearch
          ? dispatch(fetchFunction({ searchTerm, page }))
          : dispatch(fetchFunction({ page }));
      } else {
        dispatch(fetchFunction({ searchTerm, page }));
      }
    }
  };

  const nextPage = () => {
    const nextPageNumber = page + 1;
    setPage(nextPageNumber);
    handleFetch(nextPageNumber, searched);
  };

  useEffect(() => {
    if (searchResults.length > 0) return;

    setSearched(false);
    dispatch(clearSearchResults());
    setPage(1);
    setSearchTerm("");

    if (selectedOption.id === "mangas") {
      dispatch(topManga({ page }));
    } else if (selectedOption.id === "games") {
      dispatch(topGames({ page }));
    }
  }, [selectedOption, dispatch, page]);

  const userId = window
    .querySelector("[data-clerk-user-id]")
    ?.getAttribute("data-clerk-user-id");
  console.log(userId); // Logs the user ID if available

  return (
    <div className="flex gap-4 p-8 justify-center">
      <div className="max-w-screen-xl self-center flex flex-col gap-4 mt-4">
        <div className="flex justify-start items-center gap-2">
          <span className="text-[34px] font-bold text-lg text-white">
            Browse
          </span>
          <Menu>
            <div className="relative transition">
              <Menu.Button className="text-[34px] text-white flex gap-1 items-center font-bold bg-primary blue-bg rounded-md p-2">
                {selectedOption.name}
                <DownChevron className="w-7 h-7" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-8"
              >
                <Menu.Items className="text-[18px] z-10 absolute bg-slate-800 bg-transparent-600 w-full translate-y-2 p-4 rounded-md min-w-40">
                  {options.map(
                    (option) =>
                      option !== selectedOption && (
                        <Menu.Item
                          key={option.id}
                          as="div"
                          onClick={() => setSelectedOption(option)}
                        >
                          <p className="font-bold text-white select-none cursor-pointer hover:text-blue-400">
                            {option.name}
                          </p>
                        </Menu.Item>
                      )
                  )}
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFetch={handleFetch}
          setSearched={setSearched}
          setPage={setPage}
        />
        {!searched &&
          ["Manga", "Video Games"].includes(selectedOption.name) && (
            <h1 className="text-gray-500 text-lg font-semibold tracking-wider uppercase">
              Trending right now
            </h1>
          )}
        <div className="flex justify-between flex-row results w-full">
          {searchResults.length > 0 &&
            searchResults.map(
              (
                {
                  title,
                  imageUrl,
                  id,
                }: { title: string; imageUrl: string; id: string },
                index: number
              ) => {
                if (imageUrl !== "") {
                  const isLastElement = searchResults.length === index + 1;
                  return (
                    <ResultCard
                      key={title}
                      title={title}
                      imageUrl={imageUrl}
                      id={id}
                      type={selectedOption.id}
                      lastElement={isLastElement ? lastResultElement : null}
                    />
                  );
                }
                return null;
              }
            )}
          {searchLoading && loadingCards()}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
