import { makeAutoObservable, observable, action, computed } from 'mobx';
import { BASE_OMDB_URL, MOVIES_PER_PAGE } from '../utils';

export interface IMovie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbId: string;
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
    currentPageNum: number = 1;
    totalNumberOfPages: number = 0;

    constructor() {
        makeAutoObservable(this, {
            movies: observable,
            isLoading: observable,
            isError: observable,
            getMovies: action,
            setCurrentPageNumber: action,
            setTotalNumberOfPages: action,
            currentPageNumber: computed,
        });
    }

    async getMovies(params: Record<string, any>) {
        this.isLoading = true;
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const endpoint = `${BASE_OMDB_URL}?apikey=${apiKey}&${generateQueryParams(
            params
        )}`;

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

    setCurrentPageNumber(num: number) {
        this.currentPageNum = num;
    }

    // TODO => Check how to compute it automatically
    setTotalNumberOfPages() {
        this.totalNumberOfPages = Math.floor(this.totalMoviesCount / MOVIES_PER_PAGE);
    }

    get currentPageNumber() {
        return this.currentPageNum;
    }
}

export const moviesState = new MoviesState();
