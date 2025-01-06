import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  bookDetails,
  comicDetails,
  gameDetails,
  mangaDetails,
  movieDetails,
  tvDetails,
} from "./fetchers";

export type detailsState = {
  details: any;
  detailsLoading: boolean;
  error: string | null;
};

const initialState: detailsState = {
  details: {},
  detailsLoading: true,
  error: null,
};

const detailsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })

      // TV Details
      .addCase(tvDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })

      // Book Details
      .addCase(bookDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })

      // Game Details
      .addCase(gameDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })

      // Manga Details
      .addCase(mangaDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })

      // Comic Details
      .addCase(comicDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
      })
      .addMatcher(isFulfilled, (state) => {
        state.detailsLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addMatcher(isPending, (state) => {
        state.details = {};
        state.detailsLoading = true;
        state.error = null;
      });
  },
});

export default detailsSlice.reducer;
