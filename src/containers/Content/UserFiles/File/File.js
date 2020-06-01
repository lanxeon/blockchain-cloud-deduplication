import React from "react";

import classes from "./File.module.css";

const File = props => {
	return (
		<div className={classes.file}>
			<span>{props.values.name}</span>
			<span>{props.values.file.size}</span>
			<span>{props.values.dateAdded}</span>
			<button onClick={props.onDownload(props.values.file.path)}>Hello</button>
		</div>
	);
};

export default File;
