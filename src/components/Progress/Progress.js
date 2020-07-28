import React from "react";

import classes from "./Progress.module.css";

import ProgressBar from "./ProgressBar/ProgressBar";

const Progress = (props) => {
	// const [completed, setCompleted] = useState(0);

	// useEffect(() => {
	// 	setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
	// }, []);
	console.log(props);

	return (
		<div className={classes.Progress}>
			{props.files.map((file) => {
				return <ProgressBar key={Math.random()} completed={file.completed} message={file.message} />;
			})}
		</div>
	);
};

export default Progress;
