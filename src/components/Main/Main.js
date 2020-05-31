import React from "react";
import classes from "./Main.module.css";

import Content from "../../containers/Content/Content";

const Main = props => {
	return (
		<main className={classes.main}>
			<Content />
		</main>
	);
};

export default Main;
