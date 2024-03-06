import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/main-reducer.ts"
import mainPageReducer from "./reducers/movie-page-reducer.ts"
import { movieAPI } from "../services/movieService.ts";
const rootReducer = combineReducers({
    gameReducer,
    mainPageReducer,
    [movieAPI.reducerPath]: movieAPI.reducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieAPI.middleware),
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']