import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils';
import { AnimalType } from '../types';
const cachedBreed: Record<string, string[]> = {};

const useBreedList = (
    animal: AnimalType
): [string[], React.Dispatch<React.SetStateAction<string[]>>] => {
    const [breeds, setBreeds] = useState<string[]>([]);

    useEffect(() => {
        async function getAnimalBreed() {
            try {
                const res = await fetch(`${BASE_URL}/breeds?animal=${animal}`);
                const { breeds } = await res.json();
                if (breeds?.length) {
                    cachedBreed[animal] = breeds;
                    setBreeds(breeds);
                }
            } catch (err) {
                console.warn('err', err);
            }
        }
        if (animal) {
            if (cachedBreed[animal]) {
                setBreeds(cachedBreed[animal]);
                return;
            }
            getAnimalBreed();
        }
    }, [animal]);

    return [breeds, setBreeds];
};

export default useBreedList;
