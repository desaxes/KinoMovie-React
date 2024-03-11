import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { authorize, fetchMovieById, getMoviesToCollection, logIn, searchMoreMovies, searchMovies } from "./ActionCreators.ts"

const initialState: GameState = {
    searchMovies: {
        Search: [],
        Response: '',
        totalResults: ''
    },
    movies: [],
    isLoading: false,
    error: '',
    currentMovie: {},
    searchType: 'movie',
    auth: false,
    loginInfo: {
        user_id: 0,
        authKey: '',
        name: '',
    }
}

export const movieSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        // Создание редьюсеров
        // movieFetching(state) {
        //     state.isLoading = true
        // },
        // movieFetchStart(state) {
        //     state.currentMovie.Title = ''
        //     state.currentMovie.Year = ''
        //     state.currentMovie.Rated = ''
        //     state.currentMovie.Released = ''
        //     state.currentMovie.Runtime = ''
        //     state.currentMovie.Genre = ''
        //     state.currentMovie.Director = ''
        //     state.currentMovie.Writer = ''
        //     state.currentMovie.Actors = ''
        //     state.currentMovie.Country = ''
        //     state.currentMovie.Poster = ''
        // },
        // movieFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false
        //     state.error = action.payload
        // }
        changeSearchType(state, action: PayloadAction<string>) {
            state.searchType = action.payload
        },
        logOut(state, action: PayloadAction) {
            state.auth = false
            state.loginInfo = { user_id: 0, authKey: '', name: '' }
            localStorage.setItem('AUTH-TOKEN', '')
        }
    },
    extraReducers: {
        // Экстра редьюсеры для CreateAsyncThunk
        [fetchMovieById.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = ''
            state.currentMovie.Title = action.payload.Title
            state.currentMovie.Year = action.payload.Year
            state.currentMovie.Rated = action.payload.Rated
            state.currentMovie.Released = action.payload.Released
            state.currentMovie.Runtime = action.payload.Runtime
            state.currentMovie.Genre = action.payload.Genre
            state.currentMovie.Director = action.payload.Director
            state.currentMovie.Writer = action.payload.Writer
            state.currentMovie.Actors = action.payload.Actors
            state.currentMovie.Country = action.payload.Country
            state.currentMovie.Poster = action.payload.Poster
            state.currentMovie.Type = action.payload.Type
            state.currentMovie.Plot = action.payload.Plot
            state.currentMovie.Language = action.payload.Language
            state.currentMovie.imdbRating = action.payload.imdbRating
            state.currentMovie.totalSeasons = action.payload.totalSeasons
            state.currentMovie.BoxOffice = action.payload.BoxOffice
        },
        [fetchMovieById.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchMovieById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [searchMovies.fulfilled.type]: (state, action: PayloadAction<searchMovies>) => {
            state.isLoading = false
            state.error = ''
            state.searchMovies.Search = []
            state.searchMovies = action.payload
        },
        [searchMovies.pending.type]: (state) => {
            state.isLoading = true
        },
        [searchMovies.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [searchMoreMovies.fulfilled.type]: (state, action: PayloadAction<searchMovies>) => {
            state.isLoading = false
            state.error = ''
            state.searchMovies.Search = state.searchMovies.Search.concat(action.payload.Search)
        },
        [searchMoreMovies.pending.type]: (state) => {
            state.isLoading = true
        },
        [searchMoreMovies.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [logIn.fulfilled.type]: (state, action: PayloadAction<loginInfo>) => {
            state.isLoading = false
            state.error = ''
            state.auth = true
            state.loginInfo = { user_id: action.payload.user_id, authKey: action.payload.authKey, name: action.payload.name }
            localStorage.setItem('AUTH-TOKEN', action.payload.authtoken as string)
        },
        [logIn.pending.type]: (state) => {
            state.isLoading = true
        },
        [logIn.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = 'Incorrect login or password'
        },
        [authorize.fulfilled.type]: (state, action: PayloadAction<loginInfo>) => {
            state.isLoading = false
            state.error = ''
            state.auth = true
            state.loginInfo = { user_id: action.payload.user_id, authKey: action.payload.authKey, name: action.payload.name }
        },
        [authorize.pending.type]: (state) => {
            state.isLoading = true
        },
        [authorize.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = 'Unauthorized'
        },
        [getMoviesToCollection.fulfilled.type]: (state, action: PayloadAction<movieToCollection[]>) => {
            state.isLoading = false
            state.error = ''
            state.movies = action.payload
        },
        [getMoviesToCollection.pending.type]: (state) => {
            state.isLoading = true
        },
        [getMoviesToCollection.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = 'Movie already in collection'
        },
    }
})
export default movieSlice.reducer