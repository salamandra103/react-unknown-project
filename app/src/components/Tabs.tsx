import React, { useState } from 'react';

import style from '@styles/components/Tabs.module.scss'

interface Props {
    children?: JSX.Element | JSX.Element[],
    options: TabsOptions[],
    defaultActiveTabId: number
}

interface TabsOptions {
    component: any,
    tabTitle: string,
}

const Tabs = ({ options, defaultActiveTabId }: Props): JSX.Element => {

    const [state, setState] = useState({
        activeTab: defaultActiveTabId || 0
    });

    const changeTab = (id: number) => {
        setState({
            activeTab: id
        })
    }

    return (
        <div className={style.tabs}>
            <div className="container">
                <div className="wrapper">
                    <nav className="navigation">
                        <ul>
                            {
                                options.map((tab, tabIndex) => {
                                    return (
                                        <li key={tabIndex} className={tabIndex === state.activeTab ? 'active' : ''}>
                                            <a href="#" onClick={() => changeTab(tabIndex)}>{tab.tabTitle}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <div className="content">
                        {
                            options.map((tab, tabIndex) => {
                                return (
                                    <div className={state.activeTab === tabIndex ? 'tab active' : 'tab'} key={tabIndex}>
                                        {React.createElement(tab.component)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabs;