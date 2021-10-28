import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import style from "@styles/pages/Main.module.scss";
import Chat from "@/components/Chat";

const Main = (props: RouteComponentProps): JSX.Element => (
	<main className={style.main}>
		<Chat />
	</main>
);

export default Main;
