import React from 'react';
import classes from "./MyNavbar.module.css"


const MyNavbar = () => {
    return (
        <div>
            <div className={classes.navbar}>
                <div className={classes.navbar__links}>
                    Home 
                </div>
                <div className={classes.navbar__links}>
                    About
                </div>
            </div>
        </div>
    );
};

export default MyNavbar;