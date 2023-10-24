import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PetDetails from '../pages/PetDetails';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchSinglePet } from '../hooks/useFetchSinglePet';

test('pet page returns Error block if error is returned from API', async () => {
    fetch.mockResponseOnce({
        petDetails: null,
        isLoading: false,
        isError: false,
    });

    const petDetailsPage = render(
        <MemoryRouter initialEntries={['1']}>
            <PetDetails />
        </MemoryRouter>
    );

    const errorBlock = await petDetailsPage.findByTestId('no-pet-data-block');
    expect(errorBlock).to.exist;

    petDetailsPage.unmount();
});
