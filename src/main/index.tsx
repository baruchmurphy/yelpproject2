import React, { useState, useEffect } from 'react';
import './picture.css';
import Favorites from '../components/Favorites';
import { 
        Box, 
        Typography, 
        AppBar, 
        ListItem, 
        ListItemText, 
        Divider, 
        IconButton, 
        makeStyles, 
        Drawer, 
        List,
        createStyles,
        Menu,
        MenuItem,
        Avatar
    } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { useHistory, Link } from "react-router-dom";
import HomeContent from '../components/HomeScreen';
import { useAuth } from '../contexts/AuthContext'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import Settings from '../components/settings';
import NoData from '../components/Errors/NoData';


const useStyles = makeStyles ((theme: any) => 
    createStyles({
    menuButton: {
        marginLeft: '.2rem',
        marginTop: '-.4rem',
        justifyContent: 'flex-start',
    },
    appBarBox: {
        display: 'inline-flex',
    },
    appBar: {
        height: '3rem',
        marginBottom: '3rem',
        display: 'inline-flex'
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: 'rgb(226, 226, 226)',
    },
    drawerItems: {
        textDecoration: 'none',
        color:'black'
    },
    drawerHeader: {
        width: 250,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    titleText: {
        color: 'white',
    },
    avatarButton: {
        marginTop: '-.5rem',
        marginRight: '-.3rem'
    },
    link: {
        color: 'black',
        textDecoration: 'none' 
    },
    divider: {
        marginBottom: '-7px'
    }
})
)

const Home = () => {
    const classes = useStyles();
    const { profile, logout } = useAuth();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [error, setError] = useState("");

    const toggleLoadingFalse = () => {
        setLoading(false)
    }

    useEffect(() => {
        if(profile) {
            switch(history.location.pathname) {
                case '/home':
                    setContent(<HomeContent loading={loading} toggleLoadingFalse={toggleLoadingFalse}/>)
                    setLoading(false)
                    break; 
                case '/favorites':
                    setContent(<Favorites/>)
                    setLoading(false)
                    break;
                case '/settings':
                    setContent(<Settings/>)
                    setLoading(false)
                    break;
                case '/error1':
                    setContent(<NoData/>)
                    setLoading(false)
                    break;
                default: 
                    setContent(<NoData/>)
                    setLoading(false)
            }
        }
    },[history.location.pathname, loading, profile])

    const renderLoadingCards = () => {
        const dummyArray = new Array(19).fill(0);
        return dummyArray.map((cur, idx) => {
            return (
                <Box key={idx} display='inline-flex' paddingRight='2rem' paddingTop='2rem' justifyContent='flex-start'>
                    <Skeleton height="21rem" width='12rem' count={idx}/>
                </Box>
            )
        })
    };

    const drawerItems = [
        {
            name: 'Home',
            to: '/home'
        },
        {
            name: 'Favorites',
            to: '/favorites'
        },
    ];

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <div onClick={() => setDrawerOpen(false)} key={item.name}>
                    <Link to={item.to} className={classes.drawerItems}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
                        <Divider />
                    </Link>
                </div>
            );
        });
    };

    const handleLogout = async () => {
        handleClose()
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('failed to logout')
            console.log(error)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    };


    return(
        loading ?
            <Box>
                <Typography variant='h1'><Skeleton height="3rem" count={1}/></Typography>
                <Typography variant='h1'><Skeleton height="25rem" count={1}/></Typography>
                {renderLoadingCards()}
            </Box>
        :
        <Box>
            <AppBar className={classes.appBar} color='primary'>
                <Box className={classes.appBarBox}>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="secondary" 
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Typography className={classes.titleText} variant='h4'>ravenous</Typography>
                    </Box>
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={drawerOpen}
                        >
                            <Box className={classes.drawerHeader}>
                                <IconButton onClick={() => setDrawerOpen(!drawerOpen)} >
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Box>
                            <Divider className={classes.divider} />
                            <List>
                                {renderDrawerList()}
                            </List>
                        </Drawer>
                        <IconButton className={classes.avatarButton} onClick={handleClick}>
                            <Avatar color='secondary'/>
                        </IconButton>
                        <Menu
                            id="profilemenu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className='menu'
                        >
                        <MenuItem onClick={() => {
                            handleClose()
                        }}>
                        <Link className={classes.link} to='/settings'>Settings</Link>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </AppBar>
            <Box>
               <main>{content}</main>
            </Box>
        </Box>
    )
}

export default Home