"use client";

import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import DownChevron from "../components/icons/DownChevron";
import SearchBar from "../components/SearchBar";
import Link from "next/link";
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
  const [selectedOption, setSelectedOption] = React.useState("Movies");
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searched, setSearched] = React.useState(false);
  const searchLoading = useSelector((state: any) => state.search.searchLoading);
  const searchResults = useSelector((state: any) => state.search.searchResults);
  const hasNextPage = useSelector((state: any) => state.search.hasNextPage);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  const observer: any = useRef();
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
    [searchLoading]
  );

  const loadingCards = () => {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push(<LoadingCard key={i} />);
    }
    return cards;
  };

  const handleFetch = (page: number, isSearch: boolean) => {
    switch (selectedOption) {
      case "Tv Series":
        dispatch(searchTv({ searchTerm, page }));
        break;
      case "Movies":
        dispatch(searchMovies({ searchTerm, page }));
        break;
      case "Books":
        dispatch(searchBooks({ searchTerm, page }));
        break;
      case "Video Games":
        if (isSearch) {
          dispatch(searchGames({ searchTerm, page }));
        } else {
          dispatch(topGames({ page }));
        }
        break;
      case "Manga":
        if (isSearch) {
          dispatch(searchManga({ searchTerm, page }));
        } else {
          dispatch(topManga({ page }));
        }
        break;
      case "Comics":
        dispatch(searchComics({ searchTerm, page }));
        break;
    }
  };

  const nextPage = () => {
    handleFetch(page + 1, searched);
    setPage(page + 1);
  };

  const handleChangeSelected = (option: string) => {
    setSearched(false);
    dispatch(clearSearchResults());
    setPage(1);
    setSearchTerm("");
    switch (option) {
      case "Manga":
        dispatch(topManga({ page }));
        break;
      case "Video Games":
        dispatch(topGames({ page }));
        break;
    }
    setSelectedOption(option);
  };
  return (
    <div className="flex gap-4 p-8 justify-center ">
      <div className="max-w-screen-xl self-center flex flex-col gap-4 mt-4">
        <div className="flex justify-start items-center gap-2">
          <span className="text-[34px] font-bold text-lg text-white">
            Browse
          </span>
          <Menu>
            <div className="relative transition">
              <Menu.Button className="text-[34px] text-white flex gap-1 items-center font-bold bg-primary blue-bg rounded-md p-2">
                {selectedOption}
                <DownChevron className="w-7 h-7" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 transition-y-0"
                leaveTo="opacity-0 transition-y-8"
                afterLeave={() => {}}
              >
                <Menu.Items className="text-[18px] z-10 absolute bg-slate-800 bg-transparent-600 w-full translate-y-2 p-4 rounded-md fit min-w-40">
                  {options.map(
                    (option) =>
                      option !== selectedOption && (
                        <Menu.Item
                          key={option}
                          as="div"
                          onClick={() => handleChangeSelected(option)}
                        >
                          <p className="font-bold text-white select-none cursor-pointer hover:text-blue-400">
                            {option}
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
          setSearchTerm={setSearchTerm}
          handleFetch={handleFetch}
          setSearched={setSearched}
          setPage={setPage}
        />
        {!searched &&
          (selectedOption === "Manga" || selectedOption === "Video Games") && (
            <h1 className="text-gray-500 text-lg font-semibold tracking-wider uppercase">
              Trending right now
            </h1>
          )}
        <div className="flex justify-between flex-row results w-full">
          {searchResults.length > 0 &&
            searchResults.map(({ title, imageUrl, id }, index: number) => {
              if (searchResults.length === index + 1) {
                return (
                  <ResultCard
                    key={title}
                    title={title}
                    imageUrl={imageUrl}
                    id={id}
                    type={selectedOption}
                    lastElement={lastResultElement}
                  />
                );
              }
              return (
                <ResultCard
                  key={title}
                  title={title}
                  imageUrl={imageUrl}
                  type={selectedOption}
                  id={id}
                />
              );
            })}
          {searchLoading && loadingCards()}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
