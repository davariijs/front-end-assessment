import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { domainsApi } from '../services/domainsApi';

export const store = configureStore({
  reducer: {
    [domainsApi.reducerPath]: domainsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainsApi.middleware),
});

setupListeners(store.dispatch);
