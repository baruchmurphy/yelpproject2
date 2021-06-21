import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, IconButton, makeStyles } from '@material-ui/core';
import { StarBorderOutlined } from '@material-ui/icons';
import { useAuth } from '../../contexts/AuthContext';
import BusinessCard from '../Cards/BusinessCard';

const useStyles = makeStyles ({
    card: {
        height: '24.5rem',
        width: '17rem'
    },
    image: {
        maxHeight: '16rem',
        Width: '19rem',
    },
    state: {
        paddingRight: '7px'
    },
    restaurant: {
        fontWeight: 'bolder'
    },
    foodType: {
        color: '#CCA353',
        fontWeight: 'bolder'
    },
    stars: {
        color: '#CCA353',
        fontWeight: 'bold'
    }
});

export type Favorite = {
    img: string, 
    name: string,
    city: string, 
    state: string, 
    zip: string, 
    type: string, 
    rating: number, 
    reviewCount: number
}

const Favorites = () => {
    const classes = useStyles();
    const { profile } = useAuth();
    const [favorites, setFavorites] = useState<Favorite[] | []>([])

    useEffect(() => {
        if(profile.favorites) {
            setFavorites(profile.favorites)
        }
    },[profile.favorites])

    console.log('favorites ===', profile)

    return (
        <Box>
        {favorites.map((cur: any, idx: number) => {
            return(
                <BusinessCard business={cur} loading={false} favorites={favorites} />
            )
        })}
        </Box>
        
    )
}

export default Favorites