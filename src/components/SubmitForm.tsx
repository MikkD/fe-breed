import React, { useState, ChangeEvent, FormEvent } from 'react';
import useBreedList from '../hooks/useBreedList';
import { AnimalType } from '../types';
import { ANIMALS } from '../utils';
import {
    TextField,
    FormControl,
    Box,
    InputLabel,
    MenuItem,
    Select,
    Button,
} from '@mui/material';

export type petParamsType = {
    location: FormDataEntryValue | null;
    animal: FormDataEntryValue | null;
    breed: FormDataEntryValue | null;
};

export const SubmitForm = ({
    getAnimals,
}: {
    getAnimals: (params: petParamsType) => void;
}) => {
    const [animal, setAnimal] = useState<AnimalType>('');
    const [animals] = useState<string[]>(ANIMALS);
    const [breeds] = useBreedList(animal);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const petParams: petParamsType = {
            location: formData.get('location'),
            animal: formData.get('animal'),
            breed: formData.get('breed'),
        };

        getAnimals(petParams);
        setAnimal('');
        e.currentTarget.reset();
    };

    const selectAnimal = (e: any) => setAnimal(e.target.value as AnimalType);

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <FormControl margin='normal' fullWidth>
                <TextField
                    placeholder='Location'
                    name='location'
                    id='location'
                    variant='outlined'
                />
            </FormControl>

            <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='selection'>Animal:</InputLabel>
                <Select
                    name='animal'
                    id='selection'
                    onChange={selectAnimal}
                    variant='outlined'>
                    <MenuItem value=''>
                        <em>None</em>
                    </MenuItem>
                    {!!animals?.length &&
                        animals.map((animal) => (
                            <MenuItem key={animal} value={animal}>
                                {animal}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>

            <FormControl margin='normal' fullWidth disabled={!breeds?.length || !animal}>
                <InputLabel htmlFor='breed'>Breed</InputLabel>
                <Select name='breed' id='breed' variant='outlined'>
                    <MenuItem value=''>
                        <em>None</em>
                    </MenuItem>
                    {!!breeds.length &&
                        breeds.map((breed) => (
                            <MenuItem key={breed} value={breed}>
                                {breed}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>

            <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!animal}
                fullWidth
                size='large'
                style={{ marginTop: '1rem' }}>
                Submit
            </Button>
        </Box>
    );
};
