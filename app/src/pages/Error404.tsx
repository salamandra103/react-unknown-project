import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import style from "@styles/pages/Error404.module.scss";

const Error404 = ({ history, ...rest }: RouteComponentProps): JSX.Element => (
	<div className={style.error404}>
		<div className="container">
			<div className="wrapper">
				<img src={require("@images/404.svg")} alt="" />
				<button type="submit" onClick={(e) => history.goBack()}>Go to back!</button>
			</div>
		</div>
	</div>
);

export default Error404;
