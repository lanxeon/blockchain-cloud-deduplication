import React from "react";

const userContext = React.createContext({
	userPublicKey: null,
	alias: null,
	contract: null,
	// viewChanged: () => {},
});

export default userContext;
