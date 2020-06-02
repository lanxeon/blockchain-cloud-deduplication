import React, { Component } from "react";

import UserContext from "../../../../../context/user-context";
import classes from "./ShareButton.module.css";

class ShareButton extends Component {
	static contextType = UserContext;

	state = {
		sharing: false,
		value: "",
		formError: null,
	};

	changedHandler = e => {
		this.setState({
			value: e.target.value,
		});
	};

	toggleSharing = () => {
		let prevState = this.state.sharing;

		this.setState({
			sharing: !prevState,
		});
	};

	submitHandler = e => {
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
			<div className={classes.ShareButton}>
				<button className={classes.btn} onClick={this.toggleSharing}>
					<span>Share</span>
				</button>
				{this.state.sharing ? (
					<div className={classes.formContainer}>
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
