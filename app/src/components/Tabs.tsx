import React, { useState } from "react";

import style from "@styles/components/Tabs.module.scss";

interface Props {
    children: JSX.Element | JSX.Element[],
    defaultActiveTabId: number
}

const Tabs = ({ children, defaultActiveTabId }: Props): JSX.Element => {
	const [state, setState] = useState({
		activeTab: defaultActiveTabId || 0,
	});

	const changeTab = (id: number) => {
		setState({
			activeTab: id,
		});
	};

	return (
		<div className={style.tabs}>
			<div className="container">
				<div className="wrapper">
					<nav className="navigation">
						<ul>
							{Array.isArray(children) ? children.map((tab, tabIndex) => (
								<li key={tabIndex} className={tabIndex === state.activeTab ? "active" : ""}>
									<button type="button" onClick={() => changeTab(tabIndex)}>{tab.props["data-tab-title"]}</button>
								</li>
							)) : (
								<li className="active">
									<button type="button">{children.props["data-tab-title"]}</button>
								</li>
							)}
						</ul>
					</nav>
					<div className="content">
						{
							Array.isArray(children) ? children.map((tab, tabIndex) => (
								<div className={state.activeTab === tabIndex ? "tab active" : "tab"} key={tabIndex}>
									{tab}
								</div>
							)) : (
								<div className="tab active">
									{children}
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
