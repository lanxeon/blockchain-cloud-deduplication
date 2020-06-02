import React, { Component } from "react";

import UserContext from "../../../../../context/user-context";
import classes from "./ShareButton.module.css";
import Axios from "axios";

class ShareButton extends Component {
	static contextType = UserContext;

	//refs are probably not needed
	modal = React.createRef();
	mainModal = React.createRef();

	state = {
		contract: this.context.contract,
		sharing: false,
		value: "",
		formError: null,
	};

	componentWillUnmount = () => {
		document.removeEventListener("click", this.clickOutHandler);
	};

	//it SOMEHOW works. dont ask
	clickOutHandler = e => {
		if (this.modal.current && !this.modal.current.contains(e.target)) {
			this.setState({
				sharing: false,
			});
		}
		document.removeEventListener("click", this.clickOutHandler);
	};

	toggleSharing = () => {
		let prevState = this.state.sharing;

		if (!prevState) {
			this.setState({
				sharing: !prevState,
			});
			document.addEventListener("click", this.clickOutHandler);
		} else {
			this.setState({
				sharing: !prevState,
			});
			document.removeEventListener("click", this.clickOutHandler);
		}
	};

	changedHandler = e => {
		this.setState({
			value: e.target.value,
		});
	};

	//for sharing a file. returns error for the various use cases
	submitHandler = async e => {
		e.preventDefault();

		try {
			let userExists = await Axios.get("http://localhost:3001/user/acquire/key/" + this.state.value);

			let contractUpdateData = await this.state.contract.methods
				.shareFile(this.props.values.file.hash, this.context.userPublicKey, userExists.data.key)
				.send({ from: this.context.userPublicKey });

			if (contractUpdateData.events["FileShared"]) {
				let fileCloudShare = await Axios.post("http://localhost:3001/cloud/share", {
					from: this.context.userPublicKey,
					to: this.state.value,
					fileId: this.props.values.file._id,
				});

				console.log(fileCloudShare);
				alert("file shared to " + this.state.value);
			}

			this.setState({
				formError: null,
				value: "",
				sharing: false,
			});
		} catch (err) {
			this.setState({ formError: err.response.data.message });
		}
	};

	// render() {
	// 	let errMsg = this.state.formError ? (
	// 		<div className={classes.err}>
	// 			<span>{this.state.formError}</span>
	// 		</div>
	// 	) : null;

	// 	return (
	// 		<div className={classes.ShareButton} ref={this.mainModal}>
	// 			<button className={classes.btn} onClick={this.toggleSharing}>
	// 				<span>Share</span>
	// 			</button>
	// 			{this.state.sharing ? (
	// 				<div className={classes.formContainer} ref={this.modal}>
	// 					<form className={classes.form} onSubmit={this.submitHandler}>
	// 						<input
	// 							className={classes.input}
	// 							type="text"
	// 							minLength="3"
	// 							placeholder="Enter alias"
	// 							maxLength="15"
	// 							value={this.state.value}
	// 							onChange={this.changedHandler}
	// 						></input>
	// 						{errMsg}
	// 						<div className={classes.btnContainer}>
	// 							<button
	// 								style={{ border: "1px solid darkcyan", borderRadius: "10%", backgroundColor: "darkcyan" }}
	// 							>
	// 								<span>Share</span>
	// 							</button>
	// 							<button onClick={this.toggleSharing}>
	// 								<span style={{ color: "red" }}>Cancel</span>
	// 							</button>
	// 						</div>
	// 					</form>
	// 				</div>
	// 			) : null}
	// 		</div>
	// 	);
	// }

	render() {
		let errMsg = this.state.formError ? (
			<div className={classes.err}>
				<span>{this.state.formError}</span>
			</div>
		) : null;

		return (
			<div className={classes.ShareButton} ref={this.mainModal}>
				<button className={classes.btn} onClick={this.toggleSharing}>
					<div className={classes.shareContainer} style={{ transform: "translateY(-25%)" }}>
						<i className="material-icons">supervisor_account</i>
					</div>
				</button>
				{this.state.sharing ? (
					<div className={classes.formContainer} ref={this.modal}>
						<form className={classes.form} onSubmit={this.submitHandler}>
							<input
								className={classes.input}
								type="text"
								minLength="3"
								placeholder="Enter alias"
								maxLength="15"
								value={this.state.value}
								onChange={this.changedHandler}
							></input>
							{errMsg}
							<div className={classes.btnContainer}>
								<button
									style={{ border: "1px solid darkcyan", borderRadius: "10%", backgroundColor: "darkcyan" }}
								>
									<span>Share</span>
								</button>
								<button onClick={this.toggleSharing}>
									<span style={{ color: "red" }}>Cancel</span>
								</button>
							</div>
						</form>
					</div>
				) : null}
			</div>
		);
	}
}

export default ShareButton;
