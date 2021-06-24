import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import BusinessCard from './BusinessCard'
import { useAuth } from '../../contexts/AuthContext';
import Skeleton from 'react-loading-skeleton';

const YelpCards = ({ loading }: { loading: boolean }, ) => {
    const { businesses, profile, favorites } = useAuth();
    const [businessData, setBusinessData] = useState<any>();

    useEffect(() => {
        if(businesses) {
            setBusinessData(businesses.data.businesses)
        }
    },[businesses, profile]);

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
    


    const renderBusinessCards = () => {
        console.log(favorites);
        if(businessData && favorites) {
            return businessData.map((business: any, idx: number) => {
                return (
                    <BusinessCard business={business} loading={loading} key={idx} favorites={favorites}  />
                )
            })
        } else {
            return (
            <Box>
                {renderLoadingCards()}
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