import React, { Children, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Redirect, Route, RouteComponentProps, RouteProps, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'

import store from "@/store";
import routes from "@/routes";

import { AuthContext } from '@/contexts/auth';

function App() {
	const routeComponents = routes.map(({ path, component, requiredAuth, layout, ...rest }, key) => {
		if (layout) {
			return (
				<Route exact {...rest} path={path} key={key} render={(props) => {
					if (requiredAuth) {
						return (<AuthContext.Consumer>
							{
								auth => {
									return auth ? React.createElement(layout, props, React.createElement(component, props)) : <Redirect to="/signin" />
								}
							}
						</AuthContext.Consumer>)
					} else {
						return React.createElement(layout, props, React.createElement(component, props))
					}
				}} />
			)
		}
		return <Route path={path} component={component} key={key} />
	});

	return (
		<Provider store={store}>
			<AuthContext.Provider value={false}>
				<BrowserRouter basename="/">
					<Switch>
						{routeComponents}
					</Switch>
				</BrowserRouter>
			</AuthContext.Provider>
		</Provider>
	);
}

export default App;
