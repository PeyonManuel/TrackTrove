"use client";

import React from "react";
import SearchIcon from "./icons/searchIcon";
import { clearSearchResults } from "../store/searchSlice/actions";
import { useDispatch } from "react-redux";

interface SearchBarProps {
  setSearchTerm: (e: string) => void;
  handleFetch: (page: number, isSearch: boolean) => void;
  setSearched: (e: boolean) => void;
  setPage: (e: number) => void;
}
const SearchBar = ({
  setSearchTerm,
  handleFetch,
  setSearched,
  setPage,
}: SearchBarProps) => {
  const dispatch = useDispatch();
  const handleSearch = () => {
    setSearched(true);
    setPage(1);
    handleFetch(1, true);
    dispatch(clearSearchResults());
  };
  return (
    <div className="relative">
      <input
        type="text"
        className="focus:outline-none blue-bg text-white placeholder:text-white rounded-lg py-2 px-4 block w-full appearance-none leading-normal pl-10 max-w-56"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        onClick={() => handleSearch()}
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <SearchIcon color="gray" />
      </button>
    </div>
  );
};

export default SearchBar;
