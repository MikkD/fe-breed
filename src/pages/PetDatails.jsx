import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Carousel = ({ images }) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    return (
        <div className='carousel'>
            <div className='carousel-main-img'>
                <img src={images[mainImageIndex]} alt='main-pet-images' />
            </div>
            <div className='carousel-image-list'>
                {images.map((img, idx) => (
                    <img
                        onClick={() => {
                            if (mainImageIndex !== idx) {
                                setMainImageIndex(idx);
                            }
                        }}
                        width='250'
                        height='250'
                        className={`${
                            idx === mainImageIndex ? `active-img` : 'non-active-img'
                        }`}
                        src={img}
                        alt={img}></img>
                ))}
            </div>
        </div>
    );
};

function PetDetails() {
    const { id } = useParams();
    const [petDetails, setPetDetails] = useState();
    const { animal, breed, city, id: petId, name, description } = { ...petDetails };

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
            {petDetails?.images && <Carousel images={petDetails.images} />}

            <div className='pet-info'>
                <h2>{name}</h2>
                <p>{animal}</p>
                <p>{breed}</p>
                <p>{description}</p>
                <p>{city}</p>
                <p> {petId}</p>
            </div>
        </div>
    );
}

export default PetDetails;
