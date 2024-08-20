import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../feature/glasses/api/glassesApi.ts';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer, // Подключение редьюсера
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware), // Подключение middleware
});
