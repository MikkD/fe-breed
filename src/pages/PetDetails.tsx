import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';
import { Carousel } from '../components/Carousel';
import { Typography } from '@mui/material';

interface IPetDetails {
    animal: string;
    breed: string;
    city: string;
    id: string;
    name: string;
    description: string;
    images: [];
}

function PetDetails() {
    const { id } = useParams();
    const [petDetails, setPetDetails] = useState<IPetDetails | null>(null);
    const {
        animal,
        breed,
        city,
        id: petId,
        name,
        description,
        images,
    } = { ...petDetails };

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL}/pets?id=${id}`)
                .then((data) => data.json())
                .then(({ pets }) => {
                    if (pets?.length) {
                        setPetDetails(pets[0]);
                    }
                })
                .catch((err) => console.error('error is', err));
        }
    }, [id]);

    return (
        <div className='pet-details-container'>
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
