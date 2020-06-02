import React, { Component } from "react";

import UserContext from "../../../../../context/user-context";
import classes from "./ShareButton.module.css";

class ShareButton extends Component {
	static contextType = UserContext;

	state = {
		lol: "lol",
	};
	render() {
		return (
			<div className={classes.ShareButton}>
				<button>Share</button>
			</div>
		);
	}
}

export default ShareButton;
