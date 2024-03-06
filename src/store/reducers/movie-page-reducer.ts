import { createSlice } from "@reduxjs/toolkit"
import moviedata from '../../db/mainpage.json';
const initialState: msPage = {
    newMovies: moviedata.Newmovies,
    newSeries: moviedata.Newseries,
    popularMovies: moviedata.Popularmovies,
    popularSeries: moviedata.Popularseries,
    isLoading: false,
    error: '',
}

export const moviesPageSlice = createSlice({
    name: 'msPages',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
})
export default moviesPageSlice.reducer