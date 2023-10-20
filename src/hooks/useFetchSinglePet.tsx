import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils';

interface IPetDetails {
    animal: string;
    breed: string;
    city: string;
    petId: string;
    name: string;
    description: string;
    images: [];
}

export const useFetchSinglePet = (id: number | string | undefined) => {
    const [petDetails, setPetDetails] = useState<IPetDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`${BASE_URL}/pets?id=${id}`)
                .then((data) => data.json())
                .then((parsedData) => {
                    console.log('parsedData', parsedData);
                    const pets = parsedData.pets;
                    if (pets?.length) {
                        setPetDetails(pets[0]);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsError(true);
                    setIsLoading(false);
                    console.error('error is', err);
                });
        }
    }, [id]);
    return { petDetails, isLoading, isError };
};
