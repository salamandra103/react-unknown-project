import React from 'react'

import style from '@styles/components/Widget.module.scss'


interface Props {
    name: string,
    text: string,
    createdDate: string,
    author: string
}

const Widget = ({ name, text, createdDate, author }: Props) => {
    return (
        <div className={style.widget}>
            <div className="header">
                <p className="name">{name}</p>
            </div>
            <div className="content">
                {text}
            </div>
            <div className="footer">
                <span className="author">{author}</span>
                <span className="date">{createdDate}</span>
            </div>
        </div>
    )
}

export default Widget
