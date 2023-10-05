import { useState, useEffect } from 'react';

const cachedBreed = {};

const useBreedList = (animal) => {
    const [breeds, setBreeds] = useState([]);
    useEffect(() => {
        async function getAnimalBreed() {
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
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

export default useBreedList;
