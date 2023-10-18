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
