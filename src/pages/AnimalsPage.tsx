import React, { useState } from 'react';
import '../pages/AnimalsPage.css';
import { Pet } from '../components/Pet';
import { ReusableList } from '../components/ReusableList';
import { BASE_URL } from '../utils';
import { SubmitForm, petParamsType } from '../components/SubmitForm';
import { Grid } from '@mui/material';

function AnimalsPage() {
    const [pets, setPets] = useState([]);

    async function getAnimals(petData: petParamsType) {
        const { animal, location, breed } = petData || {};
        const ANIMALS_URL = `${BASE_URL}/pets?animal=${animal}&location=${location}&breed=${breed}`;
        const data = await fetch(ANIMALS_URL);
        const { pets } = await data.json();
        setPets(pets);
    }

    return (
        <Grid container justifyContent='space-around'>
            <Grid item xs={12} sm={5}>
                <SubmitForm getAnimals={getAnimals} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <ReusableList data={pets} itemRenderer={Pet} />
            </Grid>
        </Grid>
    );
}

export default AnimalsPage;
