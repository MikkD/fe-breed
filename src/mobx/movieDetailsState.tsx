import { makeAutoObservable, observable, action, computed, autorun } from 'mobx';
import { BASE_OMDB_URL } from '../utils';
import { IMovie } from './moviesState';

const movieDetailsDefaultState = {
    Poster: '',
    Title: '',
    Type: '',
    Year: '',
    imdbID: '',
    Runtime: '',
    Actors: '',
    imdbRating: '',
    BoxOffice: '',
    Country: '',
    Plot: '',
};

interface IMovieDetails extends IMovie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
    Runtime: string;
    Actors: string;
    imdbRating: string;
    BoxOffice: string;
    Country: string;
    Plot: string;
}

class MovieDetails {
    movie: IMovieDetails = movieDetailsDefaultState;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            movie: observable,
            isLoading: observable,
            isError: observable,
            fetchMovieDetails: action,
            resetMovieDetails: action,
        });
    }

    async fetchMovieDetails(id: string) {
        if (this.movie.imdbID === id) {
            return this.movie;
        } else {
            this.resetMovieDetails();
            this.isLoading = true;
            try {
                const movieData = await fetch(
                    `${BASE_OMDB_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`
                );
                const movieDetails = await movieData.json();
                this.movie = movieDetails;
                this.isLoading = false;
            } catch (err) {
                this.isError = true;
            }
        }
    }

    resetMovieDetails() {
        this.movie = movieDetailsDefaultState;
        this.isLoading = false;
        this.isError = false;
    }
}

export const movieDetailsState = new MovieDetails();
