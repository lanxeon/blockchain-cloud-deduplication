import React, { Fragment, useRef } from "react";

import classes from "./Header.module.css";
// import UploadMenu from "../UploadMenu/UploadMenu";

const Header = (props) => {
	let fileInput = useRef();
	const changeHandler = (e) => {
		let file = e.target.files[0];

		if (file) props.uploadFile(file);

		fileInput.current.value = "";
	};
	const fileClicked = () => {
		fileInput.current.click();
	};
	return (
		<Fragment>
			<header>
				<nav>
					<button style={{ fontSize: "1.4rem" }}>
						<span>BlockDrive</span>
					</button>
					<div className={classes.spacer}></div>
					<div className={classes.DropDownContainer}>
						<button onClick={fileClicked}>
							<div className={classes.iconContainer}>
								<i className="material-icons">cloud_upload</i>
							</div>
							<span>Upload</span>
						</button>
						{/* {props.uploadMenu ? (
							<UploadMenu
								clickHandler={(file) => props.uploadFile(file)}
								clickedOutside={props.clickedOutside}
							/>
						) : null} */}
						<div className={classes.hidden}>
							<input type="file" onChange={changeHandler} ref={fileInput}></input>
						</div>
					</div>
					<button>
						<div className={classes.iconContainer}>
							<i className="material-icons">account_circle</i>
						</div>
						<span>{props.accountAlias}</span>
					</button>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;
