import React, { useState } from 'react'
import { Card, makeStyles, Box, Typography, Divider } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { useAuth } from '../../contexts/AuthContext'
import { StarBorderOutlined, StarRateTwoTone } from '@material-ui/icons';
import { Favorite, Business } from '../types'; 
import Placeholder from './placeholder.png'

const useStyles = makeStyles ({
    card: {
        height: '24.7rem',
        width: '17.5rem',
    },
    image: {
        height: '16rem',
        maxWidth: '15rem',
    },
    imageContainer: {
        backgroundColor: 'black',
    },
    state: {
        paddingRight: '7px'
    },
    restaurant: {
        fontWeight: 'bolder',
        marginBottom: '5px'
    },
    foodType: {
        color: '#CCA353',
        fontWeight: 'bolder'
    },
    stars: {
        color: '#CCA353',
        fontWeight: 'bold',
    },
    cardContent: {
        padding: '5px'
    },
    starIcon: {
        height:'20px',
        width: '20px',
    },
    divider: {
        color: 'black',
        height:'1.5px'
    },
});

interface BusinessCardProps {
    // business: any,
    loading: boolean,
    favorites: Favorite[],
    business: Business,
}

const BusinessCard = ({ business, loading, favorites }: BusinessCardProps) => {
    const classes = useStyles();
    const { updateFavorites, deleteFavorite } = useAuth();
    const [isFavorite, setIsfavorite] = useState<boolean>(favorites.map(favorite => favorite.name).includes(business.name));

    // const toggleIsFavorite = () => {
    //     setIsfavorite(!isFavorite)
    // }

    const reformatText = (text: string) => {
        return text.split(' ')[0].replace(/[^\w\s]/gi, ' ');
    }

    return(
        <Box marginLeft='2rem' marginBottom='2rem' display='inline-flex' className={classes.card}>
            <Card elevation={5}>
                <Box className={classes.imageContainer} width='17.5rem' display='flex' justifyContent='center' >
                    <img alt='this is food' className={classes.image} src={business.image_url || Placeholder} />
                </Box>
                <Box className={classes.cardContent}>
                    <Box display='inline-flex' width='100%' justifyContent='space-between'>
                        <Typography className={classes.restaurant} align='left'>{business.name}</Typography>
                        <Box display='flex' justifyContent='center' width='20px' height='20px' >
                        {isFavorite ? 
                            <IconButton 
                                onClick={() => {
                                    deleteFavorite(business.name)
                                    setIsfavorite(false);
                                }
                            } 
                            >
                                <StarRateTwoTone color='primary' className={classes.starIcon} />
                            </IconButton> 
                            : 
                            <IconButton
                                onClick={() => {
                                    updateFavorites(
                                        {
                                            image_url:business.image_url, 
                                            name:business.name, 
                                            location: {
                                                zip_code:business.location.zip_code, 
                                                state:business.location.state, 
                                                city:business.location.city
                                            }, 
                                            categories: [{
                                                title:business.categories[0].title, 
                                            }],
                                            rating:business.rating, 
                                            review_count: business.review_count
                                        }
                                        
                                    )
                                    setIsfavorite(true);
                                }
                                } 
                            >
                                <StarBorderOutlined color='primary' className={classes.starIcon} />
                            </IconButton>
                        }
                    </Box>
                    </Box>
                    
                    <Divider className={classes.divider} />
                    <Box width='16.8rem' display='inline-flex'>
                        <Box width='9rem' justifyContent='flex-start'>
                            <Typography align='left'>{business.location.city}</Typography>
                            <Box display='inline-flex' justifyContent='flex-start' >
                                <Typography className={classes.state}>{business.location.state}</Typography>
                                <Typography>{business.location.zip_code}</Typography>
                            </Box>
                        </Box>
                        <Box width='11rem' justifyContent='flex-end'>
                            <Typography align='right' className={classes.foodType}>{reformatText(business.categories[0].title)}</Typography>
                            <Typography align='right' className={classes.stars}>{business.rating} stars</Typography>
                            <Typography align='right'>{business.review_count} reviews</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )

}

export default BusinessCard;


