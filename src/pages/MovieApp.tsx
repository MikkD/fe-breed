import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, Button, Typography, Divider } from '@mui/material';
// CARD
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// PAGINATION
import { Stack, Pagination } from '@mui/material';
//
import { moviesState } from '../mobx/moviesState';
import { observer } from 'mobx-react-lite';
import { IMovie } from '../mobx/moviesState';

// MOVIE_DETAILS_STATE
import { movieDetailsState } from '../mobx/movieDetailsState';
import MovieDetailsModal from '../components/MovieDetailsModal';

interface MovieCardViewProps extends IMovie {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const MoviePagination = observer(() => {
    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        moviesState.setSearchParams({
            s: moviesState.searchParams.s,
            page,
        });
    };
    return (
        <Stack spacing={2}>
            <Pagination
                onChange={handlePagination}
                count={moviesState.totalNumberOfPages}
                color='secondary'
                defaultPage={1}
                page={moviesState.searchParams.page}
                size='large'
            />
        </Stack>
    );
});

const MovieCardView: React.FC<MovieCardViewProps> = observer(
    ({ Poster, Title, Type, Year, imdbID, setIsModalOpen, isModalOpen }) => {
        return (
            <>
                <Card
                    sx={{
                        width: 350,
                        height: 350,

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin: '10px',
                    }}>
                    <CardMedia sx={{ height: 150 }} image={Poster} title={Type} />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {Title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Year: {Year}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ padding: '0px' }}>
                        <Button
                            sx={{ padding: '16px' }}
                            onClick={() => setIsModalOpen(true)}
                            size='large'
                            fullWidth>
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <MovieDetailsModal
                    isModalOpen={isModalOpen}
                    onModalClose={() => setIsModalOpen(false)}
                />
            </>
        );
    }
);

export interface MovieCardProps {
    movie: {
        Poster: string;
        Title: string;
        Type: string;
        Year: string;
        imdbID: string;
    };
}
const MovieCard: React.FC<MovieCardProps> = observer((props) => {
    console.log('🚀 ~ file: props:', props);
    console.log('🚀 🚀 🚀  ~ props.movie:', props.movie);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            movieDetailsState.fetchMovieDetails(props.movie.imdbID);
        }
    }, [isModalOpen, props.movie.imdbID]);

    return (
        <MovieCardView
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            {...props.movie}
        />
    );
});

const MovieList: React.FC = observer(() => {
    if (moviesState.isLoading)
        return (
            <Typography p={2} variant='body1' textAlign={'center'}>
                Loading...
            </Typography>
        );

    if (!moviesState.movies.length) {
        return (
            <Typography p={2} textAlign={'center'} variant='body1'>
                Please search for a movie
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
            {moviesState.movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </Box>
    );
});

const SearchForm: React.FC = observer(() => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const inputValue = formData.get('search-movie-input');
        console.log(
            '🚀 ~ file: MovieApp.tsx:155 ~ handleSubmit ~ inputValue:',
            inputValue
        );
        if (inputValue?.toString().trim()) {
            moviesState.setSearchParams({
                s: inputValue,
                page: moviesState.searchParams.page,
            });
        }

        event.currentTarget.reset();
    };

    return (
        <Box
            onSubmit={handleSubmit}
            component='form'
            p={2}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete='off'>
            <TextField
                name='search-movie-input'
                required
                id='outlined-required'
                label='Enter Movie Name'
            />
            <Button type='submit' sx={{ padding: 1.875 }} variant='contained'>
                Search Movie
            </Button>
        </Box>
    );
});

const MovieApp = observer(() => {
    return (
        <Grid container display='flex' flexDirection='column' pt={2}>
            {/* Search */}
            <Grid item xs={12}>
                <SearchForm />
            </Grid>
            <Divider />
            {/* Info */}
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 40px',
                    alignSelf: 'center',
                    width: '100%',
                }}>
                <Typography component='span'>
                    Pages: {moviesState.totalNumberOfPages}
                </Typography>
                <Typography component='span'>
                    Current Page: {moviesState.searchParams.page}
                </Typography>
                <Typography component='span'>
                    Total Movies: {moviesState.totalMoviesCount}
                </Typography>
            </Grid>
            <Divider />
            {/* List */}
            <Grid item>
                <MovieList />
            </Grid>
            <Divider />
            {/* Pagination */}
            {!!moviesState.movies.length && (
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '30px',
                        width: '100%',
                    }}>
                    <MoviePagination />
                </Grid>
            )}
        </Grid>
    );
});

export default MovieApp;
