"use client";

import React from "react";
import SearchIcon from "./icons/SearchIcon";
import { clearSearchResults } from "../store/searchSlice/actions";
import { useDispatch } from "react-redux";

interface SearchBarProps {
  searchTerm: string;
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
  searchTerm,
}: SearchBarProps) => {
  const dispatch = useDispatch();

  const handleSearch = () => {
    setSearched(true);
    setPage(1);
    handleFetch(1, true);
    dispatch(clearSearchResults());
  };

  const handleClear = () => {
    setSearchTerm(""); // Clears the search term
    dispatch(clearSearchResults()); // Optionally clear search results from Redux
  };

  return (
    <div className="relative max-w-56">
      {/* Input field with padding for space for the clear button */}
      <input
        type="text"
        className="focus:outline-none blue-bg text-white placeholder:text-white rounded-lg py-2 px-4 block w-full appearance-none leading-normal pl-10 pr-10 max-w-56"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {/* Search icon */}
      <button
        onClick={() => handleSearch()}
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <SearchIcon color="gray" />
      </button>

      {/* Clear Button (X) inside the search box */}
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white text-xl"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
