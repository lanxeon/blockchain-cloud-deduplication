import React, { Component } from "react";
import classes from "./UserFiles.module.css";

import UserContext from "../../../context/user-context";

import File from "./File/File";
import Axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

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
		let fileData = await Axios.get("http://localhost:3001/user/files/" + this.state.userPublicKey);

		if (fileData.data) {
			this.setState({
				files: fileData.data.files,
			});
		}
		this.setState({ isLoading: false });
	};

	//for downloading file
	onDownload = async (filePath, name) => {
		// Axios.get("http://localhost:3001/cloud/download?path=" + filePath)
		// window.open("http://localhost:3001/cloud/download?path=" + path)
		fetch("http://localhost:3001/cloud/download?path=" + filePath)
			.then(resp => resp.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				// the filename you want
				a.download = name;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch(() => alert("oh no!"));
	};

	render() {
		let renderFiles = this.state.files.map(file => (
			<File values={file} key={file._id} onDownload={(filePath, name) => this.onDownload(filePath, name)} />
		));

		return <div className={classes.UserFiles}>{this.state.isLoading ? <LoadingScreen /> : renderFiles}</div>;
	}
}

export default UserFiles;
