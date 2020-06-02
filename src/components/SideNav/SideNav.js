import React, { Component } from "react";
import classes from "./SideNav.module.css";

class SideNav extends Component {
	render() {
		return <div className={classes.SideNav}></div>;
	}
}

export default SideNav;

/*
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
*/
