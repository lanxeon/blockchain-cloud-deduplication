import React from "react";

import classes from "./Progress.module.css";

import ProgressBar from "./ProgressBar/ProgressBar";

const Progress = (props) => {
	return (
		<div className={classes.Progress}>
			{props.files.map((file) => {
				return <ProgressBar key={Math.random()} completed={file.completed} message={file.message} />;
			})}
		</div>
	);
};

export default Progress;
