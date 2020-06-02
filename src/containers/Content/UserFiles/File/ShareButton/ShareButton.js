import React, { Component } from "react";

import UserContext from "../../../../../context/user-context";
import classes from "./ShareButton.module.css";

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

		this.setState({
			formError: "Username is already taken",
		});
	};

	render() {
		let errMsg = this.state.formError ? (
			<div className={classes.err}>
				<span>{this.state.formError}</span>
			</div>
		) : null;

		return (
			<div className={classes.ShareButton} ref={this.mainModal}>
				<button className={classes.btn} onClick={this.toggleSharing}>
					<span>Share</span>
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
