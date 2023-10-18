import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../pages/AnimalsPage.css';
import { Pet } from '../components/Pet';
import { List } from '../components/List';
import { BASE_URL } from '../utils';
import { SubmitForm, petParamsType } from '../components/SubmitForm';

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
        <div className='animals-container'>
            <SubmitForm getAnimals={getAnimals} />
            <div className='results'>
                <List data={pets} itemRenderer={Pet} />
            </div>
        </div>
    );
}

export default AnimalsPage;
