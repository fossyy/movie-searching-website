import axios from "axios";
const apiKey = 'YOUR_API_KEY'
const baseUrl = "https://api.themoviedb.org/3"

export const getMovieList = async () => {
    const movie = await axios.get(`${baseUrl}/trending/movie/day?api_key=${apiKey}`)
    return movie.data.results
}

export const getMovieListbyQuery = async (q) => {
    const movie = await axios.get(`${baseUrl}/search/movie?query=${q}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`)
    return movie.data.results
}