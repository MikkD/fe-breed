import { makeAutoObservable, observable, action, computed, autorun } from 'mobx';
import { BASE_OMDB_URL, MOVIES_PER_PAGE } from '../utils';

export interface IMovie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

const generateQueryParams = (params: Record<string, any>) =>
    Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

class MoviesState {
    movies: IMovie[] = [];
    isLoading: boolean = false;
    isError: boolean = false;
    totalMoviesCount: number = 0;
    totalNumberOfPages: number = 0;
    searchParams = {
        s: '', // movie string
        page: 1, // page number
    };

    constructor() {
        makeAutoObservable(this, {
            movies: observable,
            isLoading: observable,
            isError: observable,
            getMovies: action,
            setTotalNumberOfPages: action,
            searchParams: observable,
            setSearchParams: action,
        });

        autorun(() => {
            if (this.searchParams.s) {
                this.getMovies();
            }
        });
    }

    setSearchParams(params: Record<string, any>) {
        this.searchParams = {
            s: params.s,
            page: params.s === this.searchParams.s ? params.page : 1,
        };
    }

    async getMovies() {
        this.isLoading = true;
        const apiKey = import.meta.env.VITE_REACT_APP_OMDB_API_KEY;
        const queryParams = generateQueryParams(this.searchParams);
        const endpoint = `${BASE_OMDB_URL}?apikey=${apiKey}&${queryParams}`;

        try {
            const data = await fetch(endpoint);
            const movies = await data.json();

            if (movies?.totalResults && movies.Search) {
                this.movies = movies.Search;
                this.totalMoviesCount = Number(movies.totalResults);
                this.isLoading = false;
                this.setTotalNumberOfPages();
            }
        } catch (error) {
            this.isLoading = false;
            this.isError = true;
        }
    }

    // TODO => Check how to compute it automatically
    setTotalNumberOfPages() {
        this.totalNumberOfPages = Math.floor(this.totalMoviesCount / MOVIES_PER_PAGE);
    }
}

export const moviesState = new MoviesState();
