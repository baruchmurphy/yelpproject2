import React, { useCallback, useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import FormikInput from '../../formik/FormikInput';
import * as Yup from 'yup'; 
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import YelpCards from '../Cards/YelpCards';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles ({
   sortOptions: {
       display:'flex',
       justifyContent:'center'
   }
});

const sortByOptions = {
    'best_match': 'Best Match',
    'rating': 'Highest Rating',
    'review_count': 'Most Reviewed'
}

interface HomeContentProps {
    loading: boolean;
    toggleLoadingFalse: ()=> void
}    


const HomeContent = ({loading, toggleLoadingFalse}: HomeContentProps) => {
    const classes = useStyles();
    const history = useHistory();
    const { getData, businesses } = useAuth();
    const [sortBy, setSortBy] = useState(Object.keys(sortByOptions)[0]);


    useEffect(() => {
        try {
            if (!businesses) {
                getData('sushi', 'cupertino', sortBy)
                toggleLoadingFalse();
            }
        } catch (error) {
            history.push('/error1')
        }
    },[businesses, sortBy, getData, toggleLoadingFalse])

    const validationSchema = Yup.object().shape({
        term: Yup.string().required('food type is required'),
        location: Yup.string()
            .required('location is required'),
    });

    const initialValues = {
        term: '',
        location: ''
    };

    const handleSubmit = useCallback(
        async function(values) {
            if(values.term && values.location) {
                console.log('working')
                return getData(values.term, values.location, sortBy)
            }
        },[getData, sortBy]
    )

    const getSortByClass = (sortByOption: string) => {
        if(sortByOption === sortBy) {
            return 'active';
        } else {
            return '';
        }
    };

    const handleSortByClick = (option: string) => {
        setSortBy(option)
    };


    const renderSortByOptions = () => {
        return Object.keys(sortByOptions).map((sortByOption, idx) => {
            return <li 
                        className={getSortByClass(sortByOption)} 
                        key={idx} onClick={()=> handleSortByClick(sortByOption)}
                    >
                        {(sortByOptions as any)[sortByOption]}
                    </li>
        })
    }

    return (
        <>
            <Box className='imageContainer'>
                <Box width='100%' className={classes.sortOptions}>
                    <Box className='SearchBar-sort-options'>
                        <ul>
                            {renderSortByOptions()}
                        </ul>
                    </Box>
                </Box>
                <Box className='imageContents'>
                    <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnBlur={false} 
                    validateOnChange={false} 
                    onSubmit={handleSubmit}
                    >
                        <Form>
                            <Box mb='1rem' display="flex" flexDirection='collumn' justifyContent='center'>
                                <Box width="20rem" mx='1rem'>
                                    <FormikInput
                                        fullWidth
                                        size="small"
                                        name='term'
                                        type='string'
                                        placeholder='input food type'
                                        variant='outlined'
                                        className='inputs'
                                    />
                                </Box>
                                <Box width="20rem">
                                    <FormikInput
                                        fullWidth
                                        size='small'
                                        name='location'
                                        type='string'
                                        placeholder='input location here'
                                        variant='outlined'
                                        className='inputs'
                                    />
                                </Box>
                            </Box>
                            <Box width='100%' className={classes.sortOptions}>
                                <Button color="primary" variant="contained" type='submit' className='button'>
                                    <Typography className='button'>Lets Go</Typography>
                                </Button>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </Box>
            <YelpCards loading={loading} />
        </>
    )
}

export default HomeContent