import React from 'react';
import { Grid, Box, TextField, Button, Typography, Divider } from '@mui/material';
// CARD
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//
import { moviesState } from '../mobx/moviesState';
import { observer } from 'mobx-react-lite';
import { IMovie } from '../mobx/moviesState';

const MovieCard: React.FC<IMovie> = ({ Poster, Title, Type, Year, imdbId }) => {
    const getSingleMovie = (imdbId: string) => {};
    return (
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
                    onClick={() => getSingleMovie(imdbId)}
                    size='large'
                    fullWidth>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

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
                <MovieCard key={movie.imdbId} {...movie} />
            ))}
        </Box>
    );
});

const SearchForm: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const inputValue = formData.get('search-movie-input');
        const searchParams = {
            s: inputValue,
            p: moviesState.currentPageNum,
        };
        moviesState.getMovies(searchParams);
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
};

const MovieApp = observer(() => {
    return (
        <Grid container display='flex' flexDirection='column' pt={2}>
            <Grid item xs={12}>
                <SearchForm />
            </Grid>
            <Divider />
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
                    Total Movies: {moviesState.totalMoviesCount}
                </Typography>
            </Grid>
            <Divider />

            <Grid item>
                <MovieList />
            </Grid>
        </Grid>
    );
});

export default MovieApp;
