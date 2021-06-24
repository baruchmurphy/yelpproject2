import react, { useState } from 'react'
import { Card, makeStyles, Box, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { useAuth } from '../../contexts/AuthContext'
import { StarBorderOutlined, StarRateTwoTone } from '@material-ui/icons';
import { Favorite } from '../Favorites';

const useStyles = makeStyles ({
    card: {
        height: '25.5rem',
        width: '17rem',
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
        fontWeight: 'bolder'
    },
    foodType: {
        color: '#CCA353',
        fontWeight: 'bolder'
    },
    stars: {
        color: '#CCA353',
        fontWeight: 'bold'
    },
    cardContent: {
        padding: '5px'
    }
});

interface BusinessCardProps {
    business: any,
    loading: boolean,
    favorites: Favorite[]
}

const BusinessCard = ({ business, loading, favorites }: BusinessCardProps) => {
    const classes = useStyles();
    const { updateFavorites, deleteFavorite } = useAuth();
    const [isFavorite, setIsfavorite] = useState<boolean>(favorites.map(favorite => favorite.name).includes(business.name));

    const toggleIsFavorite = () => {
        setIsfavorite(!isFavorite)
    }

    return(
        <Box marginLeft='2rem' marginBottom='2rem' display='inline-flex' className={classes.card}>
            <Card>
                <Box className={classes.imageContainer} width='17rem' display='flex' justifyContent='center' mb='5px'>
                    <img alt='this is food' className={classes.image} src={business.image_url} />
                </Box>
                <Box className={classes.cardContent}>
                    <Box>
                        <Typography className={classes.restaurant} align='left'>{business.name}</Typography>
                    </Box>
                    <Box width='16rem' display='inline-flex'>
                        <Box paddingTop='24px' width='6.5rem' justifyContent='flex-start'>
                            <Typography align='left'>{business.location.city}</Typography>
                            <Box width='8rem' display='inline-flex' justifyContent='flex-start' >
                                <Typography className={classes.state}>{business.location.state}</Typography>
                                <Typography>{business.location.zip_code}</Typography>
                            </Box>
                        </Box>
                        <Box width='9.5rem' justifyContent='flex-end'>
                                <Typography align='right' className={classes.foodType}>{business.categories[0].title}</Typography>
                            <Typography align='right' className={classes.stars}>{business.rating} stars</Typography>
                            <Typography align='right'>{business.review_count} reviews</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        {isFavorite ? 
                            <IconButton 
                                onClick={() => {
                                    deleteFavorite(business.name)
                                    setIsfavorite(false);
                                }
                            } 
                            >
                                <StarRateTwoTone color='primary' />
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
                                <StarBorderOutlined color='primary' />
                            </IconButton>
                        }
                    </Box>
                </Box>
            </Card>
        </Box>
    )

}

export default BusinessCard;


