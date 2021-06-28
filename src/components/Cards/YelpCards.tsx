import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import BusinessCard from './BusinessCard'
import { useAuth } from '../../contexts/AuthContext';
import Skeleton from 'react-loading-skeleton';
import { Business } from '../types';

const useStyles = makeStyles({
    loadingCards: {
        marginLeft: '1rem',
        marginRight: '1rem',
        marginTop: '1rem',
        marginBottom: '1rem'    
    }
});

const YelpCards = ({ loading }: { loading: boolean }, ) => {
    const classes = useStyles();
    const { businesses, profile, favorites } = useAuth();
    const [businessData, setBusinessData] = useState<Business[]>();

    useEffect(() => {
        if(businesses) {
            setBusinessData(businesses.data.businesses)
        }
    },[businesses, profile]);

    const renderBusinessCards = () => {
        if(businessData && favorites) {
            return businessData.map((business: any, idx: number) => {
                return (
                    <BusinessCard business={business} loading={loading} key={idx} favorites={favorites}  />
                )
            })
        } else {
            return (
            <Box>
                <Box display='inline-flex'>
                    <Skeleton className={classes.loadingCards} height="24.7rem" width='17.5em' count={20}/>
                </Box>
            </Box>
            )
        }
    };



    return (
            <Box>
                {renderBusinessCards()}
            </Box>
    )
}


export default YelpCards