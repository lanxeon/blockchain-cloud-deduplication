import React, { Component } from "react";
import classes from "./UserForm.module.css";

import axios from "axios";

class UserForm extends Component {
	state = {
		content: "",
		error: null,
	};

	formSubmit = async e => {
		e.preventDefault();
		console.log(this.state.content);

		if (!this.state.error) {
			let result = await axios.post("http://localhost:3001/user", {
				userKey: this.props.userPublicKey,
				userAlias: this.state.content,
			});

			console.log(result);
			window.location.reload();
		}
	};

	onChangeHandler = e => {
		this.setState({
			content: e.target.value,
		});
	};

	render() {
		return (
			<div className={classes.main}>
				<form onSubmit={this.formSubmit}>
					<input
						type="text"
						minLength="3"
						maxLength="15"
						value={this.state.content}
						onChange={this.onChangeHandler}
						placeholder="Enter alias"
					></input>
					{this.state.error ? <span>lol</span> : null}
				</form>
			</div>
		);
	}
}

export default UserForm;
