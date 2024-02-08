import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  detailsLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
