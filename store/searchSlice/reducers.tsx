import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  searchBooks,
  searchComics,
  searchGames,
  searchManga,
  searchMovies,
  searchTv,
  topManga,
} from "./fetchers";
import { clearSearchResults } from "./actions";
interface Result {
  title: string;
  imageUrl: string;
  id: string;
}
interface InitialState {
  searchResults: Result[];
  searchLoading: boolean;
  hasNextPage: boolean;
  error: null;
}

// Define the initial state
const initialState: InitialState = {
  searchResults: [],
  searchLoading: false,
  hasNextPage: true,
  error: null,
};
// Create a slice of the Redux store
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearSearchResults, (state) => {
        state.searchResults = [];
      })
      .addCase(searchTv.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(searchComics.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(searchManga.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addCase(topManga.fulfilled, (state, action) => {
        const prevResults = state.searchResults;
        state.hasNextPage = action.payload.hasNextPage;
        state.searchResults = [...prevResults, ...action.payload.results];
      })
      .addMatcher(isFulfilled, (state) => {
        state.searchLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.searchLoading = false;
        state.hasNextPage = false;
        state.error = action.error.message;
      })
      .addMatcher(isPending, (state) => {
        state.searchLoading = true;
        state.error = null;
      });
  },
});

// Export the reducer
export default searchSlice.reducer;
