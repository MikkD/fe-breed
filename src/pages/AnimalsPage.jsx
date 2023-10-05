import React, { useState, useEffect, useRef } from 'react';
import '../pages/AnimalsPage.css';
// import useBreedList from '../hooks/useBreedList';
import { ANIMALS, BASE_URL } from '../utils';

const Pet = ({ name, animal, breed, images, id, city, state }) => {
    return (
        <a href={`/details/${id}`}>
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
        </a>
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
    const formRef = useRef();
    const [petData, setPetData] = useState({ location: '', animal: '', breed: '' });
    const [animals] = useState(ANIMALS);
    const [breeds, setBreeds] = useBreedList(petData.animal);

    function resetForm() {
        formRef.current.reset();
        setPetData({ location: '', animal: '', breed: '' });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getAnimals(petData);
        resetForm();
    };

    const selectAnimal = (e) => {
        const selectedAnimalValue = e.target.value;
        if (!selectedAnimalValue) {
            setPetData((prevPetData) => ({ ...prevPetData, breed: '' }));
            setBreeds([]);
        }
        setPetData((prevPetData) => ({ ...prevPetData, animal: selectedAnimalValue }));
    };

    const selectBreed = (e) => {
        const selectedBreedValue = e.target.value;
        setPetData((prevPetData) => ({ ...prevPetData, breed: selectedBreedValue }));
    };

    return (
        <div className='search'>
            <form className='search-form' onSubmit={handleSubmit} ref={formRef}>
                <div className='form-item'>
                    <label htmlFor='location'>
                        Location.Selected Location: {petData.location}
                    </label>
                    <input
                        onChange={(e) =>
                            setPetData((prevPetData) => ({
                                ...prevPetData,
                                location: e.target.value,
                            }))
                        }
                        placeholder='Location'
                        name='location'
                        id='location'></input>
                </div>
                <div className='form-item'>
                    <label htmlFor='selection'>
                        Animal. Selected Animal: {petData.animal}
                    </label>
                    <select id='selection' onChange={selectAnimal}>
                        <option value='' name='animal'></option>
                        {!!animals?.length &&
                            animals.map((animal) => (
                                <option key={animal} name='animal' value={animal}>
                                    {animal}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='form-item'>
                    <label htmlFor='breed'>Breed. Selected Breed : {petData.breed}</label>
                    <select
                        disabled={!breeds?.length || !petData.animal}
                        id='breed'
                        onChange={selectBreed}>
                        <option value={''} name='breed'></option>
                        {!!breeds.length &&
                            breeds.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='form-item'>
                    <input
                        disabled={!petData.animal}
                        type='submit'
                        value='submit'></input>
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