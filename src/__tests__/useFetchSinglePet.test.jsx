import { expect, test } from 'vitest';
import { useFetchSinglePet } from '../hooks/useFetchSinglePet';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockedResponse = {
    numberOfResults: 1,
    startIndex: 0,
    endIndex: 0,
    hasNext: false,
    pets: [
        {
            id: 17,
            name: 'Del',
            animal: 'cat',
            city: 'Greenville',
            state: 'SC',
            description:
                'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
            breed: 'Domestic Shorthair',
            images: ['http://pets-images.dev-apis.com/pets/cat4.jpg'],
        },
    ],
};

export const restHandlers = [
    rest.get('http://pets-v2.dev-apis.com/pets', (req, res, ctx) => {
        const id = Number(req.url.searchParams.get('id'));
        if (id) {
            return res(ctx.status(200), ctx.json(mockedResponse));
        }
        return res(ctx.status(204), ctx.json({ message: 'item not found' }));
    }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeEach(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

// Tests
test('single pet data is fetched when given an id', async () => {
    const { result } = renderHook(() => useFetchSinglePet(17));

    await waitFor(() => {
        expect(result.current.petDetails).toEqual(mockedResponse.pets[0]);
    });
});

test('single pet data is not fetched when no id is given ', async () => {
    const { result } = renderHook(() => useFetchSinglePet());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await waitFor(() => {
        console.log('_____Result:', result.current);
        expect(result.current.petDetails).toBe(null);
    });
});
