import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"


export const movieAPI = createApi({
    reducerPath: 'movieAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (build) => ({
        fetchMovie: build.query<IMovie, string>({
            query: (title) => ({
                url: 'http://www.omdbapi.com',
                params: {
                    apikey: '30dba55f',
                    t: title
                }
            })
        }),
        searchMovies: build.query<searchMovies, string>({
            query: (search) => ({
                url: 'http://www.omdbapi.com',
                params: {
                    apikey: '30dba55f',
                    s: search
                }
            })
        }),
        addMovieToCollection: build.mutation<IMovie, IMovie>({
            query: (movie) => ({
                url: 'http://localhost:3003/movies',
                method: 'POST',
                body: movie,
                headers: { "Content-Type": "application/json" }
            })
        })
    })
})