import React, { Component } from "react";

import classes from "./File.module.css";

class File extends Component {
	size = "";
	reducedSize = null;
	componentWillMount = async () => {
		let fs = this.props.values.file.size;
		let i = 0;
		while (fs / 1024 > 1) {
			fs /= 1024;
			i += 1;
			this.size = i === 1 ? "KB" : i === 2 ? "MB" : i === 3 ? "GB" : "B";
			this.reducedSize = fs.toFixed(1);
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className={classes.file}>
					<div className={classes.name}>
						<span>{this.props.values.name}</span>
					</div>
					<div className={classes.size}>
						<span>{this.reducedSize + this.size}</span>
					</div>
					<div className={classes.date}>
						<span>{this.props.values.dateAdded}</span>
					</div>
					<div className={classes.download}>
						<button
							className={classes.btn}
							onClick={() => this.props.onDownload(this.props.values.file.path, this.props.values.name)}
						>
							Download
						</button>
					</div>
					<div className={classes.delete}>
						<button className={classes.btn} onClick={this.props.onDelete}>
							Delete
						</button>
					</div>
				</div>
				<hr></hr>
			</React.Fragment>
		);
	}
}

export default File;
