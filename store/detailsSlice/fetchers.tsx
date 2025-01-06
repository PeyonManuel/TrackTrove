import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TV Details Fetcher
export const tvDetails = createAsyncThunk(
  "details/tvDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/externalAPI/tvdetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Movie Details Fetcher
export const movieDetails = createAsyncThunk(
  "details/movieDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/externalAPI/moviedetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Book Details Fetcher
export const bookDetails = createAsyncThunk(
  "details/bookDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/scraping/bookdetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Game Details Fetcher
export const gameDetails = createAsyncThunk(
  "details/gameDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/scraping/gamedetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Manga Details Fetcher
export const mangaDetails = createAsyncThunk(
  "details/mangaDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/externalAPI/mangadetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Comic Details Fetcher
export const comicDetails = createAsyncThunk(
  "details/comicDetails",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.get(
        `/api/details/scraping/comicdetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
