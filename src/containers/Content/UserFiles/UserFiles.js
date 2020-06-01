import React, { Component } from "react";
import classes from "./UserFiles.module.css";

import UserContext from "../../../context/user-context";

import File from "./File/File";
import Axios from "axios";

class UserFiles extends Component {
	static contextType = UserContext;

	//keeping array of files as dummy values for now
	state = {
		userPublicKey: this.context.userPublicKey,
		alias: this.context.alias,
		isLoading: true,
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
					_id: "lol",
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
		this.setState({ isLoading: true });
		console.log("[UserFiles] -> ComponentDidMount");

		this.setState({ isLoading: false });
	};

	//for downloading file
	onDownload = path => {
		// let result = Axios.post()
		console.log(path);
		console.log(this.state.userPublicKey);
	};

	render() {
		return (
			<div className={classes.UserFiles}>
				UserFiles
				{this.state.files.map(file => (
					<File values={file} key={file._id} onDownload={path => this.onDownload(path)} />
				))}
			</div>
		);
	}
}

export default UserFiles;
