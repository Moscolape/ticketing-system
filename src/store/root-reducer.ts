// Import necessary functions and modules
import { combineReducers } from "@reduxjs/toolkit";
import navbarReducer from "@store/slices/navbarText-slice";


// Combine multiple reducers into one root reducer
const rootReducer = combineReducers({
  navbar: navbarReducer, // Navbar reducer
});

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Export the root reducer
export default rootReducer;