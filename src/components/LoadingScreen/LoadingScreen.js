// import React from 'react'

// import classes from './LoadingScreen.module.css';

// export default function LoadingScreen(props) {
//     return (
//         <div className={classes.page}>
//             <div className="loading">
//                 Loading...
//             </div>
//         </div>
//     );
// }

import React from "react";

import classes from "./LoadingScreen.module.css";

export default function LoadingScreen(props) {
	return (
		<div className={classes.preloader}>
			<div className={classes.loader}></div>
		</div>
	);
}
