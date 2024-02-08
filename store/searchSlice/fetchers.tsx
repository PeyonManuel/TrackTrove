import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface SearchComicsProps {
  searchTerm: string;
  page: number;
}
// Define the asynchronous thunk action for searching comics
export const searchComics = createAsyncThunk(
  "comics/searchComics",
  async ({ searchTerm, page }: SearchComicsProps) => {
    try {
      const response = await axios.get(
        `/api/comicsearch?searchTerm=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the asynchronous thunk action for searching comics
export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async ({ searchTerm, page }: SearchComicsProps) => {
    try {
      const response = await axios.get(
        `/api/booksearch?searchTerm=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ searchTerm, page }: SearchComicsProps) => {
    try {
      const response = await axios.get(
        `/api/moviesearch?s=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchTv = createAsyncThunk(
  "tv/searchTv",
  async ({ searchTerm, page }: SearchComicsProps) => {
    try {
      const response = await axios.get(
        `/api/tvsearch?s=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface SearchComicsProps {
  searchTerm: string;
  page: number;
}
// Define the asynchronous thunk action for searching comics
export const searchGames = createAsyncThunk(
  "games/searchGames",
  async ({ searchTerm, page }: SearchComicsProps) => {
    try {
      const response = await axios.get(
        `/api/gamesearch?searchTerm=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the asynchronous thunk action for searching comics
export const topGames = createAsyncThunk(
  "games/searchGames",
  async ({ page }: SearchComicsProps) => {
    try {
      const response = await axios.get(`/api/topgames?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface SearchMangaProps {
  searchTerm: string;
  page: number;
}
// Define the asynchronous thunk action for searching manga
export const searchManga = createAsyncThunk(
  "animeManga/searchManga",
  async ({ searchTerm, page }: SearchMangaProps) => {
    try {
      const response = await axios.get(
        `/api/mangasearch?searchTerm=${searchTerm}&mediaType=MANGA&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface TopMangaProps {
  page: number;
}

export const topManga = createAsyncThunk(
  "animeManga/topmanga",
  async ({ page }: TopMangaProps) => {
    try {
      const response = await axios.get(`/api/topmanga?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
