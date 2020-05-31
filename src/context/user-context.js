import React from "react";

const userContext = React.createContext({
	userPublicKey: null,
	alias: null,
});

export default userContext;
