import React, { useEffect, useState } from 'react'
import { Box,  Typography, Card, makeStyles } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../contexts/AuthContext';
import BusinessCard from '../Cards/BusinessCard';
import { Link } from "react-router-dom";

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

const useStyles = makeStyles ({
    card: {
       padding: '7px'
    },
    link: {
        color: 'Blue'
    }
});

const Favorites = () => {
    const { profile, favorites } = useAuth();
    const classes = useStyles();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(profile && favorites) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    },[profile, favorites])

    const renderLoadingCards = () => {
        const dummyArray = new Array(19).fill(0);
        return dummyArray.map((cur, idx) => {
            return (
                <Box key={idx} display='inline-flex' marginLeft='2rem' paddingTop='2rem' justifyContent='center'>
                    <Skeleton height="21rem" width='12rem' count={idx}/>
                </Box>
            )
        })
    };

    if(favorites && !favorites.length) {
        return( 
            <Box width='100%' height='20rem' display='flex' justifyContent='center' alignItems='center'>
                <Box width='21rem'>
                    <Card className={classes.card}>
                        <Typography variant='h6' color='textPrimary'>
                            You haven't added any favorites, Return to the <Link className={classes.link} to='/home'>Home</Link> page to add favorites
                        </Typography>
                    </Card>
                </Box>
            </Box>
        )
    }

    return (
        loading ?
            <Box>
                <Skeleton height="3rem" count={1}/>
                <Skeleton height="25rem" count={1}/>
                {renderLoadingCards()}
            </Box>
        :
        <Box marginTop='3rem' marginLeft='2rem'>
            {favorites && favorites.map((cur: any, idx: number) => {
                return(
                    <BusinessCard key={idx} business={cur} loading={false} favorites={favorites} />
                )
            })}
        </Box>
    )
}

export default Favorites