import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import BusinessCard from './BusinessCard'
import { useAuth } from '../../contexts/AuthContext';

const YelpCards = ({ loading }: { loading: boolean }, ) => {
    const { businesses, profile } = useAuth();
    const [businessData, setBusinessData] = useState<any>();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(businesses) {
            setBusinessData(businesses.data.businesses)
        }
        if(profile) {
            setFavorites(profile.favorites)
        }
    },[businesses, profile]);


    const renderBusinessCards = () => {
        if(businessData) {
            return businessData.map((business: any, idx: number) => {
                return (
                    <BusinessCard business={business} loading={loading} key={idx} favorites={favorites}  />
                )
            })
        } else {
            return '404 Not Found'
        }
    };



    return (
            <Box>
                {renderBusinessCards()}
            </Box>
    )
}


export default YelpCards

