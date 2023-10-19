import { Modal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { movieDetailsState } from '../mobx/movieDetailsState';

const MovieDetailsModal = observer(({ isModalOpen, onModalClose }: any) => {
    const {
        Poster,
        Title,
        Type,
        Year,
        Runtime,
        Actors,
        imdbRating,
        BoxOffice,
        Country,
        Plot,
    } = movieDetailsState.movie;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={onModalClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Card sx={style}>
                <CardMedia sx={{ height: 250 }} image={Poster} title={Type} />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {Title}
                    </Typography>
                    <Typography variant='body2' color='text.primary'>
                        {Plot}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Year:{Year}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Country: {Country},
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Runtime: {Runtime}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Actors: {Actors}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        imdbRating: {imdbRating}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Box Office: {BoxOffice}
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    );
});

export default MovieDetailsModal;
