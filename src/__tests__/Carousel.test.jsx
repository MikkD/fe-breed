import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Carousel } from '../components/Carousel';

test('first image item is set as main', async () => {
    const images = ['0.jpg', '1.jpg', '3.jpg'];
    const carousel = render(<Carousel images={images} />);
    const mainImg = await carousel.findByTestId('hero-img');
    expect(mainImg.src).toContain(images[0]);
    carousel.unmount();
});

test('main image is set upon clicking on image gallery item', async () => {
    const images = ['0.jpg', '1.jpg', '3.jpg'];
    const carousel = render(<Carousel images={images} />);
    const mainImg = await carousel.findByTestId('hero-img');

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const thumbnail = await carousel.findByTestId(`thumbnail-${img}`);
        await thumbnail.click();
        expect(mainImg.src).toContain(img);
        expect(Array.from(thumbnail.classList)).toContain('active-img');
    }
    carousel.unmount();
});

test('component will return undefineed if no images are passed', async () => {
    const carousel = render(<Carousel images={[]} />);
    const mainImg = carousel.queryByTestId('hero-img');
    expect(mainImg).toBeNull();
    carousel.unmount();
});
