import { ImageList, ImageListItem, Grid } from '@mui/material';
import React, { useState } from 'react';
import '../pages/AnimalsPage.css';

interface ICarouselProps {
    images: string[];
}

export const Carousel: React.FC<ICarouselProps> = ({ images }) => {
    if (!images?.length) return;

    const [mainImageIndex, setMainImageIndex] = useState<number>(0);

    const setMainImage = (idx: number) => {
        if (mainImageIndex !== idx) {
            setMainImageIndex(idx);
        }
    };

    return (
        <Grid container alignItems='center'>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <img src={images[mainImageIndex]} alt='main-pet-images' height={300} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <div className='carousel-image-list'>
                    {images.map((img, idx) => (
                        <img
                            onClick={() => setMainImage(idx)}
                            width='100'
                            height='100'
                            className={`${
                                idx === mainImageIndex ? `active-img` : 'non-active-img'
                            }`}
                            data-testId={`thumbnail-${img}`}
                            src={img}
                            alt={img}></img>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
};
