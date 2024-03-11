import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const instance = axios.create({
    baseURL: 'http://www.omdbapi.com',
})
const localInstance = axios.create({
    baseURL: 'https://authserver-nodejs-express-pgsql-production.up.railway.app/',
})
//Классический axios с RTK

// export const fetchMovie = (title: string) => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(movieSlice.actions.movieFetching())
//         const response = await instance.get('?apikey=30dba55f&t=' + title)
//         dispatch(movieSlice.actions.movieFetchingSuccess(response.data))
//     }
//     catch (e) {
//         dispatch(movieSlice.actions.movieFetchingSuccess(e.message))
//     }
// }

// Улучшенный axios c RTK и createAsyncThunk

export const fetchMovieById = createAsyncThunk(
    'movie/searchById',
    async (id: string | undefined, thunkAPI) => {
        try {
            const response = await instance.get('?apikey=30dba55f&i=' + id + '&plot=full')
            if (response.data.Error) {
                return thunkAPI.rejectWithValue(response.data.Error)
            }
            else {
                return response.data
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const searchMovies = createAsyncThunk(
    'movies/searchForTitle',
    async (data: { title: string, type: string, page: number }, thunkAPI) => {
        const response = await instance.get<searchMovies>(`?apikey=30dba55f&&type=${data.type}&s=${data.title}&page=${data.page.toString()}`)
        try {
            if (response.data.Response === 'False') {
                return thunkAPI.rejectWithValue(response.data.Error)
            }
            else {
                return response.data
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const searchMoreMovies = createAsyncThunk(
    'movies/searchMore',
    async (data: { title: string, type: string, page: number }, thunkAPI) => {
        const response = await instance.get<searchMovies>(`?apikey=30dba55f&&type=${data.type}&s=${data.title}&page=${data.page.toString()}`)
        try {
            if (response.data.Response === 'False') {
                return thunkAPI.rejectWithValue(response.data.Error)
            }
            else {
                return response.data
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const logIn = createAsyncThunk(
    'auth/login',
    async (data: { login: string, password: string }, thunkAPI) => {
        const response = await localInstance.get(`/auth?login=${data.login}&password=${data.password}`)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const authorize = createAsyncThunk(
    'auth/authorize',
    async (data: { key: string }, thunkAPI) => {
        const response = await localInstance.get(`/auth/appstart?key=${data.key}`)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const registAccount = createAsyncThunk(
    'auth/registration',
    async (data: { login: string, password: string, name: string }, thunkAPI) => {
        const response = await localInstance.post(`/auth`, data)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const addMovieToCollection = createAsyncThunk(
    'collection/add',
    async (data: {
        movieId: string,
        userId: number,
        title: string,
        poster: string,
        type: string,
        userrait: number,
        genre: string,
        year: string
    }, thunkAPI) => {
        const response = await localInstance.post(`/auth/collection`, data)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const getMoviesToCollection = createAsyncThunk(
    'collection/get',
    async (data: { id: number }, thunkAPI) => {
        const response = await localInstance.get<movieToCollection[]>(`/auth/collection/${data.id}`)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const checkCollection = createAsyncThunk(
    'collection/check',
    async (data: { id: string, userid: number }, thunkAPI) => {
        const response = await localInstance.get<movieToCollection[]>(`/auth/collection?id=${data.id}&userid=${data.userid}`)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const removeFromCollection = createAsyncThunk(
    'collection/remove',
    async (data: { id: string, userid: number }, thunkAPI) => {
        const response = await localInstance.delete(`/auth/collection?id=${data.id}&userid=${data.userid}`)
        try {
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)