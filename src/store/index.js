import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { registerApi } from "../services/register.services";
import { serviceDetailsApi } from "../services/services.services";
import userSlice from "./slices/user.slice";

export const store = configureStore({
    reducer:{
        [registerApi.reducerPath]: registerApi.reducer,
        [serviceDetailsApi.reducerPath]:serviceDetailsApi.reducer,
        userSlice: userSlice.reducer
    },
    middleware:(middlewares)=> middlewares().concat([registerApi.middleware],[serviceDetailsApi.middleware])
})

setupListeners(store.dispatch)