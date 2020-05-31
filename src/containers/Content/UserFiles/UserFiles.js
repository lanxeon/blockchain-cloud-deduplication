import React, { Component } from "react";
import classes from "./UserFiles.module.css";

import UserContext from "../../../context/user-context";

class UserFiles extends Component {
	static contextType = UserContext;

	//keeping array of files as dummy values for now
	state = {
		userPublicKey: this.context.userPublicKey,
		alias: this.context.alias,
		files: [
			{
				_id: "file1",
				file: {
					hash: "hash",
					path: "path",
					size: 10428,
					extension: ".txt",
				},
				name: "file1.txt",
				dateAdded: "31/05/2020",
			},
			{
				_id: "file2",
				file: {
					hash: "hash",
					path: "path",
					size: 9274928,
					extension: ".pdf",
				},
				name: "file2.pdf",
				dateAdded: "30/05/2020",
			},
			{
				_id: "file3",
				file: {
					hash: "hash",
					path: "path",
					size: 123495812,
					extension: ".docx",
				},
				name: "file2.docx",
				dateAdded: "01/06/2020",
			},
		],
	};

	componentDidMount = async () => {
		console.log("[UserFiles] -> ComponentDidMount");
		console.log(this.state);
	};

	render() {
		return (
			<div className={classes.UserFiles}>
				UserFiles
				{this.state.files.map(file => (
					<div key={file._id}>file.name</div> //Will swap it with a file component
				))}
			</div>
		);
	}
}

export default UserFiles;
