import React, { createContext, useState } from 'react';
import './Navbar.css';
import Filter from './Filter';
import BrandLogo from '../img/brandLogo.svg';
import BBC from '../img/bbcLogo.png';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';

// Context Creation of BBC-News Swtich
const BbcChecked = createContext();

const Navbar = () => {
    const [bbcChecked, setBbcChecked] = useState(false);

    // Handle Switch Button
    const handleBBC = (event) => {
        setBbcChecked(event.target.checked);
    }

    return (
        <>
            <BbcChecked.Provider value={bbcChecked}>
                <AppBar position="static" className="navigation_bar">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" className="brand_icon">
                            <img src={BrandLogo} alt="World Today" />
                        </IconButton>
                        <Typography variant="h6" className="brand_name">
                            World Today
                        </Typography>
                        <div className="bbc_source">
                            <Switch
                                checked={bbcChecked}
                                onChange={handleBBC}
                                color="primary"
                                name="bbcChecked"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <img src={BBC} alt="BBC News" />
                        </div>
                    </Toolbar>
                </AppBar>

                {/* FILTER Component */}
                <Filter />
            </BbcChecked.Provider>
        </>
    );
}

export default Navbar;
export { BbcChecked };