import {
    Avatar,
    ListItem,
    ListItemAvatar,
    Typography,
    ListItemText,
    Divider,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IPet {
    name: string;
    animal: string;
    breed: string;
    images: string;
    id: string;
    city: string;
    state: string;
}

export const Pet = ({ name, animal, breed, images, id, city, state }: IPet) => {
    return (
        <Link to={`/details/${id}`} style={{ marginBottom: '16px' }}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            width: 150,
                            height: 150,
                            marginRight: 2,
                            marginTop: 0,
                        }}
                        alt={`${name}`}
                        src={images[0]}
                    />
                </ListItemAvatar>
                <ListItemText>
                    <div>
                        <Typography variant='button' mr={1}>
                            Name:
                        </Typography>
                        {name}
                    </div>
                    <div>
                        <Typography variant='button' mr={1}>
                            Animal:
                        </Typography>
                        {animal}
                    </div>
                    <div>
                        <Typography variant='button' mr={1}>
                            Breed:
                        </Typography>
                        {breed}
                    </div>
                    <div>
                        <Typography variant='button' mr={1}>
                            City:
                        </Typography>
                        {city}
                    </div>
                    <div>
                        <Typography variant='button' mr={1}>
                            State:
                        </Typography>
                        {state}
                    </div>
                </ListItemText>
            </ListItem>
            <Divider />
        </Link>
    );
};
