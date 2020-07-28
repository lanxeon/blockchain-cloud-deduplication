import React from "react";

const ProgressBar = (props) => {
	const { message, completed } = props;

	const bgcolor = "#6a1b9a";

	const containerStyles = {
		height: 10,
		width: "100%",
		backgroundColor: "#e0e0de",
		borderRadius: 50,
		boxSizing: "border-box",
		margin: "0.1rem 0",
		border: "none",
	};

	const fillerStyles = {
		height: "100%",
		width: `${completed}%`,
		backgroundColor: bgcolor,
		borderRadius: "inherit",
		textAlign: "right",
		transition: "width 0.6s ease-in-out",
	};

	// const labelStyles = {
	// 	padding: 5,
	// 	color: "white",
	// 	fontWeight: "bold",
	// 	fontSize: "0.7em",
	// };

	return (
		<div>
			<div style={containerStyles}>
				<div style={fillerStyles}></div>
			</div>
			<p>{message}</p>
		</div>
	);
};

export default ProgressBar;

//  <span style={labelStyles}>{`${completed}%`}</span>
