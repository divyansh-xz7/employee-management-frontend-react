import { configureStore } from "@reduxjs/toolkit";
import authApi from "./services/authApi";
import departmentApi from './services/departmentApi';
import employeeApi from './services/employeeApi'
import countryApi from "./services/countryApi";
import authReducer from './slices/authSlice';
import metaReducer from './slices/metaSlice';


export const store = configureStore({
    reducer: {
        auth:authReducer,
        meta:metaReducer,
        [authApi.reducerPath] : authApi.reducer,
        [departmentApi.reducerPath]:departmentApi.reducer,
        [employeeApi.reducerPath] : employeeApi.reducer,
        [countryApi.reducerPath] : countryApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(departmentApi.middleware)
    .concat(employeeApi.middleware)
    .concat(countryApi.middleware)
});