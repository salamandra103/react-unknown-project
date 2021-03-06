import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router';

import Chat from '@/components/Chat';

import style from "@styles/pages/Main.module.scss"

const Main = (props: RouteComponentProps): JSX.Element => {
    return (
        <main className={style.main}>
            <Chat />
        </main>
    )
}

export default Main
