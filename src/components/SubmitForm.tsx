import React, { useState, ChangeEvent, FormEvent } from 'react';
import useBreedList from '../hooks/useBreedList';
import { AnimalType } from '../types';
import { ANIMALS } from '../utils';

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

    const selectAnimal = (e: ChangeEvent<HTMLSelectElement>) =>
        setAnimal(e.target.value as AnimalType);

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
