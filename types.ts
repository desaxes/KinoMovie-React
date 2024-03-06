interface IMovie {
    Title?: string,
    Year?: string,
    Rated?: string,
    Released?: string,
    Runtime?: string,
    Genre?: string,
    Director?: string,
    Writer?: string,
    Actors?: string,
    Country?: string,
    Poster?: string,
    Error?: string,
    Type?: string,
    Plot?: string,
    Language?: string,
    imdbRating?: string,
    totalSeasons?: string,
    BoxOffice?: string
}
interface ISearch {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}
interface GameState {
    searchMovies: searchMovies
    movies: movieToCollection[]
    isLoading: boolean
    error: string
    currentMovie: IMovie,
    searchType: string,
    auth: boolean,
    loginInfo: loginInfo
}
interface msPage {
    newMovies: ISearch[],
    newSeries: ISearch[],
    popularMovies: ISearch[],
    popularSeries: ISearch[],
    isLoading: boolean,
    error: string,
}
type loginInfo = {
    user_id: number, authKey: string, name: string, authtoken?: string
}
type searchMovies = {
    Search: ISearch[],
    totalResults: string,
    Response: string,
    Error?: string
}
type movieToCollection = {
    movieid: string,
    user_id: number,
    title: string,
    poster: string,
    type: string,
    userrait: number,
    genre: string,
    year: string
}