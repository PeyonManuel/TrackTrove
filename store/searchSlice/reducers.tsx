import { createSlice } from "@reduxjs/toolkit";
import {
  searchBooks,
  searchComics,
  searchGames,
  searchManga,
  searchMovies,
  searchTv,
  topGames,
  topManga,
} from "./fetchers";
import { clearSearchResults } from "./actions";
interface Result {
  title: string;
  imageUrl: string;
  id: string;
}
interface InitialState {
  searchResults: {
    books: Result[];
    comics: Result[];
    games: Result[];
    mangas: Result[];
    movies: Result[];
    tv: Result[];
  };
  searchLoading: {
    books: boolean;
    comics: boolean;
    games: boolean;
    mangas: boolean;
    movies: boolean;
    tv: boolean;
  };
  hasNextPage: {
    books: boolean;
    comics: boolean;
    games: boolean;
    mangas: boolean;
    movies: boolean;
    tv: boolean;
  };
  error: {
    books: string | null;
    comics: string | null;
    games: string | null;
    mangas: string | null;
    movies: string | null;
    tv: string | null;
  };
}

// Define the initial state
const initialState: InitialState = {
  searchResults: {
    books: [],
    comics: [],
    games: [],
    mangas: [],
    movies: [],
    tv: [],
  },
  searchLoading: {
    books: false,
    comics: false,
    games: false,
    mangas: false,
    movies: false,
    tv: false,
  },
  hasNextPage: {
    books: false,
    comics: false,
    games: false,
    mangas: false,
    movies: false,
    tv: false,
  },
  error: {
    books: null,
    comics: null,
    games: null,
    mangas: null,
    movies: null,
    tv: null,
  },
};
// Create a slice of the Redux store
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(clearSearchResults, (state) => {
      //   state.searchResults = [];
      // })
      .addCase(searchTv.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.tv = [];
        }
        state.searchLoading.tv = true;
        state.error.tv = null;
        state.hasNextPage.tv = true; // Start with true or the appropriate value
      })
      .addCase(searchTv.fulfilled, (state, action) => {
        const prevResults = state.searchResults.tv;
        state.hasNextPage.tv = action.payload.data.hasNextPage;
        state.searchResults.tv = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.tv = false;
      })
      .addCase(searchTv.rejected, (state, action) => {
        state.searchLoading.tv = false;
        state.error.tv = action.error.message || null;
        state.hasNextPage.tv = false; // If request failed, set to false
      })

      .addCase(searchMovies.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.movies = [];
        }
        state.searchLoading.movies = true;
        state.error.movies = null;
        state.hasNextPage.movies = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const prevResults = state.searchResults.movies;
        state.hasNextPage.movies = action.payload.data.hasNextPage;
        state.searchResults.movies = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.movies = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchLoading.movies = false;
        state.error.movies = action.error.message || null;
        state.hasNextPage.movies = false; // If request failed, set to false
      })

      .addCase(searchBooks.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.books = [];
        }
        state.searchLoading.books = true;
        state.error.books = null;
        state.hasNextPage.books = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        const prevResults = state.searchResults.books;
        state.hasNextPage.books = action.payload.data.hasNextPage;
        state.searchResults.books = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.books = false;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.searchLoading.books = false;
        state.error.books = action.error.message || null;
        state.hasNextPage.books = false; // If request failed, set to false
      })

      .addCase(searchGames.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.games = [];
        }
        state.searchLoading.games = true;
        state.error.games = null;
        state.hasNextPage.games = true;
      })
      .addCase(topGames.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.games = [];
        }
        state.searchLoading.games = true;
        state.error.games = null;
        state.hasNextPage.games = true;
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        const prevResults = state.searchResults.games;
        state.hasNextPage.games = action.payload.data.hasNextPage;
        state.searchResults.games = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.games = false;
      })
      .addCase(topGames.fulfilled, (state, action) => {
        const prevResults = state.searchResults.games;
        state.hasNextPage.games = action.payload.data.hasNextPage;
        state.searchResults.games = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.games = false;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.searchLoading.games = false;
        state.error.games = action.error.message || null;
        state.hasNextPage.games = false; // If request failed, set to false
      })
      .addCase(topGames.rejected, (state, action) => {
        state.searchLoading.games = false;
        state.error.games = action.error.message || null;
        state.hasNextPage.games = false; // If request failed, set to false
      })

      .addCase(searchComics.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.comics = [];
        }
        state.searchLoading.comics = true;
        state.error.comics = null;
        state.hasNextPage.comics = true;
      })
      .addCase(searchComics.fulfilled, (state, action) => {
        const prevResults = state.searchResults.comics;
        state.hasNextPage.comics = action.payload.data.hasNextPage;
        state.searchResults.comics = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.comics = false;
      })
      .addCase(searchComics.rejected, (state, action) => {
        state.searchLoading.comics = false;
        state.error.comics = action.error.message || null;
        state.hasNextPage.comics = false; // If request failed, set to false
      })

      .addCase(searchManga.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.mangas = [];
        }
        state.searchLoading.mangas = true;
        state.error.mangas = null;
        state.hasNextPage.mangas = true;
      })
      .addCase(topManga.pending, (state, action) => {
        const page = action.meta.arg.page;
        if (page === 1) {
          state.searchResults.mangas = [];
        }
        state.searchLoading.mangas = true;
        state.error.mangas = null;
        state.hasNextPage.mangas = true;
      })
      .addCase(searchManga.fulfilled, (state, action) => {
        const prevResults = state.searchResults.mangas;
        state.hasNextPage.mangas = action.payload.data.hasNextPage;
        state.searchResults.mangas = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.mangas = false;
      })
      .addCase(topManga.fulfilled, (state, action) => {
        const prevResults = state.searchResults.mangas;
        state.hasNextPage.mangas = action.payload.data.hasNextPage;
        state.searchResults.mangas = [
          ...prevResults,
          ...action.payload.data.results,
        ];
        state.searchLoading.mangas = false;
      })
      .addCase(searchManga.rejected, (state, action) => {
        state.searchLoading.mangas = false;
        state.error.mangas = action.error.message || null;
        state.hasNextPage.mangas = false; // If request failed, set to false
      })
      .addCase(topManga.rejected, (state, action) => {
        state.searchLoading.mangas = false;
        state.error.mangas = action.error.message || null;
        state.hasNextPage.mangas = false; // If request failed, set to false
      });
  },
});

export default searchSlice.reducer;
