import React, { Component } from "react";
import classes from "./SideNav.module.css";
import Axios from "axios";
import UserContext from "../../context/user-context";

class SideNav extends Component {
	static contextType = UserContext;

	state = {
		uploaded: 0,
		saved: 0,
		total: 0,
		uploadedPercentage: 0,
		savedPercentage: 0,
		isLoading: true,
	};

	componentDidMount = async () => {
		this.setState({ isLoading: true });

		let sizes = await Axios.get("http://localhost:3001/user/bandwidth/" + this.context.userPublicKey);

		console.log(sizes);

		const uploaded = sizes.data.uploaded;
		const saved = sizes.data.saved;
		let total = uploaded + saved;

		let uploadedPerc, savedPerc;

		if (total !== 0) {
			uploadedPerc = (uploaded * 100) / total;
			savedPerc = 100 - uploadedPerc;
		}

		this.setState({
			uploaded: uploaded,
			saved: saved,
			total: total,
			uploadedPercentage: uploadedPerc,
			savedPercentage: savedPerc,
			isLoading: false,
		});

		console.log(this.state);
	};

	render() {
		return (
			<div className={classes.SideNav}>
				{!this.state.isLoading ? (
					<div className={classes.progressContainer}>
						<div className={classes.progressBar}>
							<div className={classes.uploaded} style={{ width: `${this.state.uploadedPercentage}%` }}></div>
							<div className={classes.saved} style={{ width: `${this.state.savedPercentage}%` }}></div>
						</div>
						<div className={classes.mapContainer}>
							<div style={{ color: "red" }}>
								<span>Uploaded</span>
							</div>
							<div style={{ color: "cyan" }}>
								<span>Saved</span>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default SideNav;

/*
<nav className={classes.NavBar}>
                <h3>SideNav</h3>
                <hr></hr>
                <button>Button 1</button>
                <hr></hr>
                <button>Button 2</button>
                <hr></hr>
                <button>Button 3</button>
                <hr></hr>
            </nav>
*/
