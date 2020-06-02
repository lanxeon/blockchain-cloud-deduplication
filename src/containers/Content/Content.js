import React, { Component } from "react";
import classes from "./Content.module.css";

import UserFiles from "./UserFiles/UserFiles";

class Content extends Component {
	render() {
		return (
			<div className={classes.content}>
				<UserFiles />
			</div>
		);
	}
}

export default Content;
