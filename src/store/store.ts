// Import necessary functions and modules
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@store/root-reducer';

// Configure Redux store with the root reducer
const store = configureStore({
  reducer: rootReducer, // Set the root reducer
});

// Export the configured Redux store
export default store;