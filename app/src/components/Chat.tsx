import React, { useState, useRef, useEffect, useCallback, useMemo, FormEvent } from 'react'
import io, { Socket } from 'socket.io-client'

import style from '@styles/components/Chat.module.scss'

interface State {
    currentUser: string,
    chatform: string,
    counter: number,
    messages: Array<Message>,
    rooms: Array<Room>
}

interface Room {
    id: number,
    name?: string,
    active: boolean,
    users: string[]
}

interface Message {
    text: string,
    author: string,
    id: number
}

const Chat = () => {
    const socketRef = useRef<Socket | null>(null);
    const [state, setState] = useState<State>({
        currentUser: 'user_1',
        chatform: '',
        counter: 0,
        messages: [
            {
                text: 'Lorem ipsum dolor sit amet.',
                author: 'user_1',
                id: 1,
            },
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aut placeat voluptas!',
                author: 'user_1',
                id: 2,
            },
            {
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, dolore repudiandae recusandae quas veniam quam maxime dolores rem iusto adipisci saepe?',
                author: 'user_2',
                id: 3,
            },
            {
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing.',
                author: 'user_1',
                id: 4,
            }
        ],
        rooms: [
            {
                id: 1,
                name: 'Комната 12312',
                active: false,
                users: ['Ivan', 'Petya']
            },
            {
                id: 2,
                name: 'Комната Adsadsac',
                active: false,
                users: ['Oskar', 'John']
            }
        ]
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
    }

    const connectRoom = async (e: React.FormEvent<HTMLInputElement>): Promise<any> => {
        let selectedRoom: {
            id?: number,
            name?: string
        } = {};

        await setState({
            ...state,
            rooms: state.rooms.map(room => {
                if (room.id === parseInt(e.currentTarget.value)) {
                    selectedRoom = { ...room }
                    return {
                        ...room,
                        active: !room.active
                    }
                }
                return { ...room, active: false };
            })
        });


        if (socketRef.current) {
            socketRef.current.emit('connectRoom', selectedRoom.id, selectedRoom.name)
        }
    }

    useEffect(() => {
        socketRef.current = io("http://localhost:3001", {
            query: {
                testValue: 'Test'
            }
        });

        socketRef.current.on('getRoom', room => {
            console.log(room);
        })
    }, []);

    return (
        <div className={style.chat}>
            <div className="container">
                <div className="form">
                    <div className="messages">
                        <div className="messages__container">
                            <div className="messages__list">
                                {state.messages.map(item => {
                                    return (
                                        <div key={item.id} className={`messages__item ${item.author === state.currentUser ? 'messages__item_right' : ''}`}>
                                            <span className="messages__author">{item.author}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea name="chatform" cols={30} rows={10} placeholder="Введите текст" onChange={handleChange}></textarea>
                        <div className="buttons">
                            <button type="submit">Отправить</button>
                        </div>
                    </form>
                </div>
                <div className="rooms">
                    <h4>Комнаты</h4>
                    <ul>
                        {
                            state.rooms.map(room => (
                                <li key={room.id}>
                                    <label>
                                        <input type="radio" onChange={connectRoom} checked={room.active} name="rooms" value={room.id} />
                                        <span>{room.name}</span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Chat
