import React, { Component } from "react";

import "./App.css";
import Web3 from "web3";
import { sha256 } from "js-sha256";
import axios from "axios";

import Header from "./Header/Header";
import Main from "./Main/Main";
import SideNav from "./SideNav/SideNav";
import Footer from "./Footer/Footer";
import CreateUser from "./CreateUser/CreateUser";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import { ABI, ADDRESS } from "./config/contract";

class App extends Component {
	componentDidMount = async () => {
		try {
			//business logic here like Web3 and http request functions
			if (this.state.userPublicKey)
				this.setState({
					isLoading: false,
				});

			console.log("Entered componentDidMount");

			//load up account from web3, and load up blockchain data into state
			await this.loadBlockchainData();

			//making http requests after assuring public key exists
			if (this.state.userPublicKey && this.state.FileBlockchain) {
				let userExists = await axios.get("http://localhost:3001/user/" + this.state.userPublicKey);
				if (!userExists.data) {
					console.log("User does not exist in database");
					this.setState({ userExists: false });
				} else {
					console.log("User found in database");
					console.log(userExists.data);
					this.setState({
						userExists: true,
						userAlias: userExists.data,
					});
				}
			}

			this.setState({
				isLoading: false,
			});
		} catch (err) {
			console.log(err);
			this.setState({
				isLoading: false,
				userExists: false,
			});
		}
	};

	//Web3 functions to load up blockChain and smart contract data
	async loadBlockchainData() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
		const accounts = await web3.eth.getAccounts();
		this.setState({ userPublicKey: accounts[0] });
		const FileBlockchain = new web3.eth.Contract(ABI, ADDRESS);
		this.setState({ FileBlockchain });
	}

	//to toggle dropdown menu of the upload menu
	DropDownMenuToggled = () => {
		let currentUploadMenu = this.state.UploadMenu;
		this.setState({
			UploadMenu: !currentUploadMenu,
		});
	};

	//toggling the closing of menu
	clickedOutsideHandler = () => {
		if (this.state.UploadMenu) this.setState({ UploadMenu: false });
	};

	//To handle file upload
	fileUploadHandler = async file => {
		let fr = new FileReader();

		fr.onload = async () => {
			let bf = fr.result;
			let arr = new Uint8Array(bf);
			let hexString = "";

			for (let i = 0; i < arr.length; i++) hexString += arr[i].toString(16);

			let hash = "0x" + sha256(hexString);

			const results = await this.state.FileBlockchain.methods.insertFile(hash, this.state.userPublicKey, file.name).send({
				from: this.state.userPublicKey,
			});

			//New File, upload entire file to cloud
			if (results.events["NewUpload"]) {
				console.log("NEW FILE UPLOAD");

				//Getting the returned values from blockchain event
				const recvHash = results.events["NewUpload"].returnValues.fh;
				const recvAddr = results.events["NewUpload"].returnValues.addr;
				const recvName = results.events["NewUpload"].returnValues.name;

				//making a form to post to backend
				let formData = new FormData();
				formData.append("hash", recvHash); // formData.append("hash", hash);
				formData.append("owner", recvAddr); // formData.append("owner", this.state.userPublicKey);
				formData.append("name", recvName); // formData.append("name", file.name);
				formData.append("fileSize", file.size);
				formData.append("file", file, file.name);

				let uploaded = await axios.post("http://localhost:3001/cloud/upload/new", formData);

				console.log(uploaded.data.message);
			}
			//Duplicate file, register owner as user(if file doesn't exist, then reupload the file as well)
			else if (results.events["DuplicateUpload"]) {
				console.log("DUPLICATE FILE DOWNLOAD");

				let fileExists = await axios.get("http://localhost:3001/cloud/integrity/" + hash);
				console.log(fileExists);

				if (fileExists.data) {
					let jsonData = {
						hash: results.events["DuplicateUpload"].returnValues.fh,
						owner: results.events["DuplicateUpload"].returnValues.addr,
						name: file.name,
					};
					let duplicateUploadRes = await axios.post("http://localhost:3001/cloud/upload/dup", jsonData);

					if (duplicateUploadRes.data)
						alert("Duplicate file: bandwidth and storage of " + file.size / 1000000 + "MB saved");
					/* eof */
				} else {
					//making a form to post to backend
					let formData = new FormData();
					formData.append("hash", results.events["DuplicateUpload"].returnValues.fh);
					formData.append("owner", results.events["DuplicateUpload"].returnValues.addr);
					formData.append("name", file.name);
					formData.append("fileSize", file.size);
					formData.append("file", file, file.name);

					let uploaded = await axios.post("http://localhost:3001/cloud/upload/new", formData);

					console.log(uploaded.data.message);
				}
			}
			//duplicate file and user, need to verify if file exists just in case, if it doesn't, then reupload the file as well
			else if (results.events["DuplicateUploadAndUser"]) {
				console.log("DUPLICATE FILE AND USER IS OWNER AS WELL");

				let fileExists = await axios.get("http://localhost:3001/cloud/integrity/" + hash);
				console.log(fileExists);

				if (fileExists.data) {
					let jsonData = {
						hash: results.events["DuplicateUploadAndUser"].returnValues.fh,
						owner: results.events["DuplicateUploadAndUser"].returnValues.addr,
						name: file.name,
					};
					let duplicateUploadRes = await axios.post("http://localhost:3001/cloud/upload/dup", jsonData);

					if (duplicateUploadRes.data)
						alert("Duplicate file and user: bandwidth and storage of " + file.size / 1000000 + "MB saved");
					/* eof */
				} else {
					//making a form to post to backend
					let formData = new FormData();
					formData.append("hash", results.events["DuplicateUploadAndUser"].returnValues.fh);
					formData.append("owner", results.events["DuplicateUploadAndUser"].returnValues.addr);
					formData.append("name", file.name);
					formData.append("fileSize", file.size);
					formData.append("file", file, file.name);

					let uploaded = await axios.post("http://localhost:3001/cloud/upload/new", formData);

					console.log(uploaded.data.message);
				}
			}
		};

		fr.readAsArrayBuffer(file);
	};

	//state of the component. use setState to change the state. NOTE: change in state forces a rerender cycle
	state = {
		isLoading: true,
		alias: null,
		files: [],
		userPublicKey: null,
		userExists: false,
		UploadMenu: false,
	};

	//main function to call that renders the elements on screen
	render = () => {
		let Page = (
			<React.Fragment>
				{!this.state.userExists ? <CreateUser userPublicKey={this.state.userPublicKey} /> : null}
				{/* Bare skeleton structure  */}
				<Header
					uploadOnClick={file => this.DropDownMenuToggled(file)}
					uploadMenu={this.state.UploadMenu}
					accountKey={this.state.userPublicKey}
					accountAlias={this.state.userAlias}
					uploadFile={file => this.fileUploadHandler(file)}
					clickedOutside={this.clickedOutsideHandler}
				/>
				<SideNav />
				<Main />
				<Footer />
			</React.Fragment>
		);

		return <div className="container">{!this.state.isLoading ? Page : <LoadingScreen />}</div>;
	};
}

export default App;
