import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../entities/task/model";
import { api } from "../shared/api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        task: taskSlice.reducer
    },
    middleware: (gDM) => gDM().concat(api.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;