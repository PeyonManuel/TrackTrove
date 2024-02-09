import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice/reducers";
import detailsReducer from "./detailsSlice/reducers";

const store = configureStore({
  reducer: {
    search: searchReducer,
    details: detailsReducer,
  },
});

export default store;
