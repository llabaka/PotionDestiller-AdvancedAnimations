import { API_KEY, GENRES } from "./config";

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

export const data = require('./movies.json');

// Función para mapear los datos de las películas
export const mapMoviesData = () => {

    const mappedMovies = data.movies.map(movie => ({
    id: movie.id,
    title: movie.original_title,
    releaseDate: movie.release_date,
    overview: movie.overview,
    voteAverage: movie.vote_average,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    genres: movie.genre_ids.map(genreId => GENRES[genreId] || 'Unknown'), // Si tienes un mapeo de géneros
    }));

    console.log(mappedMovies);

    return mappedMovies;
};