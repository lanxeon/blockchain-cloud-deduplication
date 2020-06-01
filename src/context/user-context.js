import React from "react";

const userContext = React.createContext({
	userPublicKey: null,
	alias: null,
	contract: null,
});

export default userContext;
