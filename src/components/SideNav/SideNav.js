import React from 'react';
import classes from './SideNav.module.css';

const SideNav = (props) => {
    return (
        <div className={classes.SideNav}>
            <nav className={classes.NavBar}>
                <h3>SideNav</h3>
                <hr></hr>
                <button>Button 1</button>
                <hr></hr>
                <button>Button 2</button>
                <hr></hr>
                <button>Button 3</button>
                <hr></hr>
            </nav>
        </div>
    );
}

export default SideNav;