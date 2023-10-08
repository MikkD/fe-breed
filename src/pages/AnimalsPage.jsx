import React, { useState, useEffect, useRef } from 'react';
import '../pages/AnimalsPage.css';
// import useBreedList from '../hooks/useBreedList';
import { ANIMALS, BASE_URL } from '../utils';
import { Link } from 'react-router-dom';

const Pet = ({ name, animal, breed, images, id, city, state }) => {
    return (
        <Link to={`/details/${id}`}>
            <div key={id} className='pet-container'>
                <div className='pet-img'>
                    <img width='150' height='150' src={images[0]} alt={animal} />
                </div>
                <div className='pet-info'>
                    <div className='name'>Name: {name}</div>
                    <div>Animal Type: {animal}</div>
                    <div>Breed: {breed}</div>
                    <div>City: {city}</div>
                    <div>State: {state}</div>
                    <div>Id: {id}</div>
                </div>
            </div>
        </Link>
    );
};

const List = ({ data, itemRenderer: ItemRenderer }) => {
    return (
        <ul>
            {!data?.length ? (
                <h3>No data found </h3>
            ) : (
                data.map((item) => (
                    <li>
                        <ItemRenderer key={item.id} {...item} />
                    </li>
                ))
            )}
        </ul>
    );
};

const cachedBreed = {};

const useBreedList = (animal) => {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        async function getAnimalBreed() {
            const res = await fetch(`${BASE_URL}/breeds?animal=${animal}`);
            const { breeds } = await res.json();
            if (breeds?.length) {
                cachedBreed[animal] = breeds;
                setBreeds(breeds);
            }
        }
        if (animal) {
            if (cachedBreed[animal]) return setBreeds(cachedBreed[animal]);
            getAnimalBreed();
        }
    }, [animal]);

    return [breeds, setBreeds];
};

const SubmitForm = ({ getAnimals }) => {
    const [animal, setAnimal] = useState('');
    const [animals] = useState(ANIMALS);
    const [breeds] = useBreedList(animal);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const petParams = {
            location: formData.get('location'),
            animal: formData.get('animal'),
            breed: formData.get('breed'),
        };

        getAnimals(petParams);
        setAnimal();
        e.target.reset();
    };

    const selectAnimal = (e) => {
        const selectedAnimalValue = e.target.value;
        setAnimal(selectedAnimalValue);
    };

    return (
        <div className='search'>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='form-item'>
                    <label htmlFor='location'>Location.Selected Location:</label>
                    <input placeholder='Location' name='location' id='location'></input>
                </div>
                <div className='form-item'>
                    <label htmlFor='selection'>Animal. Selected Animal:</label>
                    <select name='animal' id='selection' onChange={selectAnimal}>
                        <option value=''></option>
                        {!!animals?.length &&
                            animals.map((animal) => (
                                <option key={animal} value={animal}>
                                    {animal}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='form-item'>
                    <label htmlFor='breed'>Breed. Selected Breed :</label>
                    <select disabled={!breeds?.length || !animal} id='breed' name='breed'>
                        <option value={''}></option>
                        {!!breeds.length &&
                            breeds.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='form-item'>
                    <input disabled={!animal} type='submit' value='submit'></input>
                </div>
            </form>
        </div>
    );
};

function AnimalsPage() {
    const [pets, setPets] = useState([]);

    async function getAnimals(petData) {
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
