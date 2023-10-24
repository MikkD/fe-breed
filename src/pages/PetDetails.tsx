import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePet } from '../hooks/useFetchSinglePet';
import { Carousel } from '../components/Carousel';
import { Typography } from '@mui/material';

function PetDetails() {
    const { id } = useParams();
    const { petDetails, isLoading, isError } = useFetchSinglePet(id);

    if (!petDetails) {
        return (
            <Typography variant='h3' data-testId='no-pet-data-block'>
                ...No Pet Data Found
            </Typography>
        );
    }

    if (isError)
        return (
            <Typography variant='h3' data-testId='error-block'>
                ...Error
            </Typography>
        );

    if (isLoading) {
        return (
            <Typography variant='h3' data-testId='loader'>
                ...Loading
            </Typography>
        );
    }
    const { animal, breed, city, name, description, images } = { ...petDetails };

    return (
        <div data-testId='pet-info-block' className='pet-details-container'>
            <Carousel images={images || []} />
            <div className='pet-info'>
                <Typography variant='h6' gutterBottom>
                    {name}
                </Typography>
                <Typography variant='subtitle2' gutterBottom>
                    Animal type: {animal}
                </Typography>
                <Typography variant='subtitle2' gutterBottom>
                    Breed: {breed}
                </Typography>
                <Typography width='50%' variant='subtitle2' gutterBottom>
                    Info: {description}
                </Typography>
                <Typography variant='subtitle2' gutterBottom>
                    Location: {city}
                </Typography>
            </div>
        </div>
    );
}

export default PetDetails;
