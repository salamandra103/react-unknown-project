import React, { Children, useEffect, createContext, useContext, useMemo, useState } from "react";
import { BrowserRouter, Redirect, Route, RouteComponentProps, RouteProps, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'

import store from "@/store";
import routes from "@/routes";

import { AuthContext } from "@/contexts/auth";
import useAuth from "@/hooks/useAuth";

import Main from '@/pages/Main'
import SignIn from '@/pages/SignIn'
import Error404 from '@/pages/Error404'


function App() {
	debugger
	const _auth = useAuth();
	debugger

	const routeComponents = routes.map(({ path, component, requiredAuth, layout, ...rest }, key) => {
		if (layout) {
			return (
				<Route exact {...rest} path={path} key={key} render={(props) => {
					if ((path === '/registration' || path === '/signin') && _auth.user) {
						return <Redirect to="/" />
					} else {
						if (requiredAuth) {
							return _auth.user ? React.createElement(layout, props, React.createElement(component, props)) : <Redirect to="/signin" />
						} else {
							return React.createElement(layout, props, React.createElement(component, props))
						}
					}
				}} />
			)
		}
		return (<Route path={path} render={props => React.createElement(component, props)} key={key} />)
	});

	return (
		<Provider store={store}>
			<BrowserRouter basename="/">
				{/* <AuthContext.Provider value={_auth}> */}
				<Switch>
					{routeComponents}
				</Switch>
				{/* </AuthContext.Provider> */}
			</BrowserRouter>
		</Provider >
	);
}

export default App;
