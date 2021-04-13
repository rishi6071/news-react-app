import React from 'react';
import './Navbar.css';
import BrandLogo from '../img/brandLogo.png';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
    return (
        <>
            <AppBar position="static" className="navigation_bar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className="brand_icon">
                        <img src={BrandLogo} alt="World Today" />
                    </IconButton>
                    <Typography variant="h6" className="brand_name">
                        World Today
                    </Typography>
                    <Button variant="contained" className="bbc_source px-4">
                        BBC NEWS
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;