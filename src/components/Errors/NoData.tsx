import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles, Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        marginTop: '4rem',
        width: '25rem',
        height: '21rem',
    }
});

const NoData = () => {
    const classes = useStyles();
    const { logout } = useAuth();

    const handleLogout = async() => {
       await logout()
    };

    return (
        <Card className={classes.card}>
            <Typography variant='h6'>
                Error 1: Unable to retrieve restaurant data
            </Typography>
            <Typography>
                Return to <Link onClick={handleLogout} to='/'>Login Page</Link>
            </Typography>
        </Card>
    )
}

export default NoData