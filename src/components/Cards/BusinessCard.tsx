import react from 'react'
import { Card, CardContent, makeStyles, Box, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { useAuth } from '../../contexts/AuthContext'
import { StarBorderOutlined, StarRateTwoTone } from '@material-ui/icons';
import { Favorite } from '../Favorites';


const useStyles = makeStyles ({
    card: {
        height: '26rem',
        width: '17rem',
    },
    image: {
        height: '16rem',
        maxWidth: '15rem',
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

    const isFavorite = favorites.map(favorite => favorite.name).includes(business.name);

    return(
        <Box marginRight='2rem' marginTop='2rem' display='inline-flex' className={classes.card}>
            <Card className={classes.cardContent}>
                    <Box width='16rem' display='flex' justifyContent='center' mb='1rem'>
                        <img alt='this is food' className={classes.image} src={business.image_url} />
                    </Box>
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
                                onClick={() => deleteFavorite(
                                    {
                                        img:business.image_url, 
                                        name:business.name, 
                                        city:business.location.city, 
                                        state:business.location.state, 
                                        zip:business.location.zip_code, 
                                        type:business.categories[0].title, 
                                        rating:business.rating, 
                                        reviewCount: business.review_count
                                    }
                                    )} 
                            >
                                <StarRateTwoTone color='primary' />
                            </IconButton> 
                            : 
                            <IconButton
                                onClick={() => 
                                    updateFavorites(
                                        {
                                            img:business.image_url, 
                                            name:business.name, 
                                            city:business.location.city, 
                                            state:business.location.state, 
                                            zip:business.location.zip_code, 
                                            type:business.categories[0].title, 
                                            rating:business.rating, 
                                            reviewCount: business.review_count
                                        }
                                    )} 
                            >
                                <StarBorderOutlined color='primary' />
                            </IconButton>
                        }
                    </Box>
            </Card>
        </Box>
    )

}

export default BusinessCard;


