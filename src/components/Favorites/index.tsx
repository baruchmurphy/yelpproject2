import React, { useEffect, useState } from 'react';
import { Box,  Typography, Card, makeStyles } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../contexts/AuthContext';
import BusinessCard from '../Cards/BusinessCard';
import { Link } from "react-router-dom";

const useStyles = makeStyles ({
    card: {
       padding: '7px',
    },
    link: {
        color: 'Blue'
    },
    loadingCards: {
        marginLeft: '1rem', 
        marginRight: '1rem', 
        marginTop: '1rem'
    }
});

const Favorites = () => {
    const { profile, favorites } = useAuth();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(profile && favorites) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    },[profile, favorites]);

    if(favorites && !favorites.length) {
        return( 
            <Box width='100%' height='20rem' display='flex' justifyContent='center' alignItems='center'>
                <Box width='21rem'>
                    <Card elevation={5} className={classes.card}>
                        <Typography variant='h6' color='textPrimary'>You haven&apos;t added any favorites, Return to the <Link className={classes.link} to='/home'>Home</Link> page to add favorites</Typography>
                    </Card>
                </Box>
            </Box>
        )
    };

    return (
        loading ?
            <Box>
                <Skeleton height="3rem" count={1}/>
                <Box display='inline-flex' >
                    <Skeleton className={classes.loadingCards} height="24.7rem" width='17.5em' count={20}/>
                </Box>
            </Box>
        :
        <Box marginTop='5rem'>
            {favorites && favorites.map((cur: any, idx: number) => {
                return(
                    <BusinessCard key={idx} business={cur} loading={false} favorites={favorites} />
                )
            })}
        </Box>
    )
}

export default Favorites;