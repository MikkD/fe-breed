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
            console.log('🚀 ~ ~ autorun ,this.searchParam:', this.searchParams);
            if (this.searchParams.s) {
                console.log('searchParams changed', this.searchParams);
                this.getMovies();
            }
        });
    }

    setSearchParams(params: Record<string, any>) {
        console.log('🚀 ~ ~ params:', params);
        this.searchParams = {
            s: params.s,
            page: params.s === this.searchParams.s ? params.page : 1,
        };
    }

    async getMovies() {
        console.log('______getMOVIES triggered');
        this.isLoading = true;
        // process.env.REACT_APP_OMDB_API_KEY;
        const apiKey = import.meta.env.VITE_REACT_APP_OMDB_API_KEY;
        console.log('🚀 apiKey:', apiKey);

        const queryParams = generateQueryParams(this.searchParams);
        console.log('🚀  queryParams:', queryParams);
        const endpoint = `${BASE_OMDB_URL}?apikey=${apiKey}&${queryParams}`;

        console.log('🚀 ~  endpoint:', endpoint);
        try {
            const data = await fetch(endpoint);
            const movies = await data.json();
            console.log('🚀 ~  movies:', movies);

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
