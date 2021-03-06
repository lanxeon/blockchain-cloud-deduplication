import React, { PureComponent } from "react";
import classes from "./CreateUser.module.css";

import UserForm from "../../containers/UserForm/UserForm";

class CreateUser extends PureComponent {
	render() {
		return (
			<div className={classes.overlay}>
				<div className={classes.main}>
					<h2>Welcome, new User!</h2>
					<h3>
						In order to get started, just make an alias. This will be your identity you use to share files with
						others... kind of like a username
					</h3>
					{this.props.userPublicKey ? (
						<UserForm userPublicKey={this.props.userPublicKey} />
					) : (
						<div>
							<h1>NO ETHEREUM CLIENT DETECTED. INSTALL METAMASK</h1>
						</div>
					)}
				</div>
			</div>
		);
	}
}

// CreateUser.propTypes = {

// };

export default CreateUser;
