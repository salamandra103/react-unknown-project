import React, { Children, useEffect, createContext } from "react";
import { BrowserRouter, Route, RouteComponentProps, RouteProps, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as Material from '@material-ui/core';

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'

import store from "@/store";
import routes from "@/routes";

function App() {
	const Auth = createContext(null)

	const routeComponents = routes.map(({ path, component, requiredAuth, layout, ...rest }, key) => {
		// let Layout = layout;
		if (layout) {
			// React.createElement(...layout, )
			return (
				<Route exact {...rest} path={path} key={key} render={(props) => {
					return React.createElement(layout, props, React.createElement(component, props))
				}} />
			)
		}
		return <Route path={path} component={component} key={key} />
	});

	return (
		<Provider store={store}>
			<BrowserRouter basename="/">
				<Switch>
					{routeComponents}
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
