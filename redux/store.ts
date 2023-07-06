import { configureStore } from '@reduxjs/toolkit';
import ApiReducer from './apiSlice';

export interface RootState {
  api: ReturnType<typeof ApiReducer>;
}

export const store = configureStore({
  reducer: {
    api: ApiReducer,
  },
})