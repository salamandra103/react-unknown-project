import React, { useContext } from "react";

import { AuthContext } from "@/contexts/auth";

import Navigation from "@/components/Navigation";

const LoginLayout = ({ children }: { children?: JSX.Element }) => (
	<>
		<Navigation />
		{children}
	</>
);

export default LoginLayout;
