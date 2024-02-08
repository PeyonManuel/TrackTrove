import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface MovieDetailsProps {
  id: string;
}

export const movieDetails = createAsyncThunk(
  "movies/movieDetails",
  async ({ id }: MovieDetailsProps) => {
    try {
      const response = await axios.get(`/api/moviedetails?i=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
