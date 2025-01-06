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
        `/api/search/scraping/comicsearch?searchTerm=${searchTerm}&page=${page}`
      );
      return { data: response.data, page: page };
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
        `/api/search/scraping/booksearch?searchTerm=${searchTerm}&page=${page}`
      );
      return { data: response.data, page: page };
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
        `/api/search/externalAPI/moviesearch?s=${searchTerm}&page=${page}`
      );
      return { data: response.data, page: page };
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
        `/api/search/externalAPI/tvsearch?s=${searchTerm}&page=${page}`
      );
      return { data: response.data, page: page };
    } catch (error) {
      throw error;
    }
  }
);

interface SearchComicsProps {
  searchTerm: string;
  page: number;
}

let currentGameController: AbortController | null = null; // Keep track of the current controller
// If there's an ongoing request, abort it

// Define the asynchronous thunk action for searching comics
export const searchGames = createAsyncThunk(
  "games/searchGames",
  async ({ searchTerm, page }: SearchComicsProps) => {
    if (currentGameController !== null) {
      // @ts-ignore
      currentGameController.abort();
    }

    // Create a new AbortController for the new request
    currentGameController = new AbortController();
    const signal = currentGameController.signal;
    try {
      const response = await axios.get(
        `/api/search/scraping/gamesearch?searchTerm=${searchTerm}&page=${page}`,
        { signal: signal }
      );
      return { data: response.data, page: page };
    } catch (error) {
      throw error;
    }
  }
);

// Define the asynchronous thunk action for searching comics
export const topGames: any = createAsyncThunk(
  "games/topgames",
  async ({ page }: SearchComicsProps) => {
    if (currentGameController !== null) {
      // @ts-ignore
      currentGameController.abort();
    }

    // Create a new AbortController for the new request
    currentGameController = new AbortController();
    const signal = currentGameController.signal;
    try {
      const response = await axios.get(
        `/api/search/scraping/topgames?page=${page}`,
        {
          signal: signal,
        }
      );
      return { data: response.data, page: page };
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
        `/api/search/externalAPI/mangasearch?searchTerm=${searchTerm}&mediaType=MANGA&page=${page}`
      );
      return { data: response.data, page: page };
    } catch (error) {
      throw error;
    }
  }
);

interface TopMangaProps {
  page: number;
}

export const topManga: any = createAsyncThunk(
  "animeManga/topmanga",
  async ({ page }: TopMangaProps) => {
    try {
      const response = await axios.get(
        `/api/search/externalAPI/topmanga?page=${page}`
      );
      return { data: response.data, page: page };
    } catch (error) {
      throw error;
    }
  }
);
