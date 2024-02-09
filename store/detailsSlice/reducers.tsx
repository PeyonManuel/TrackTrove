import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { movieDetails } from "./fetchers";

const initialState = {
  details: {},
  detailsLoading: false,
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
      .addMatcher(isFulfilled, (state) => {
        state.detailsLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message;
      })
      .addMatcher(isPending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      });
  },
});

export default detailsSlice.reducer;
