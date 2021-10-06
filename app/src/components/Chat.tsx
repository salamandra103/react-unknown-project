import React, { useState, useRef, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import style from '@styles/components/Chat.module.scss'

interface State {
    currentUser: string,
    messages: Array<{
        text: string,
        author: string,
        id: number
    }>,
    rooms: Array<{
        id: number | string,
        name: string,
        messages: [],
        active: boolean
    }>
}

const Chat = () => {
    const socketRef = useRef<Socket | null>(null);
    const [state, setState] = useState<State>({
        currentUser: 'user_1',
        messages: [
            {
                text: 'Message 1',
                author: 'user_1',
                id: 1,
            },
            {
                text: 'Message 2',
                author: 'user_1',
                id: 2,
            },
            {
                text: 'Message 3 of other user',
                author: 'user_2',
                id: 3,
            },
            {
                text: 'Message 4',
                author: 'user_1',
                id: 4,
            }
        ],
        rooms: [
            {
                id: '615d8f34ab682ad4df1bbead',
                name: 'Room 1',
                messages: [],
                active: false,
            },
            // {
            //     id: 2,
            //     name: 'Room Advt',
            //     messages: [],
            //     active: false,
            // },
            // {
            //     id: 3,
            //     name: 'Room S2da',
            //     messages: [],
            //     active: false,
            // }
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

    const connectRoom = (id: number | string) => {
        let selectedRoom: any = null;
        setState({
            ...state,
            rooms: state.rooms.map(room => {
                if (room.id === id) {
                    selectedRoom = room;
                    return {
                        ...room,
                        active: !room.active
                    }
                }
                return {
                    ...room,
                    active: false
                };
            })
        })
        if (socketRef.current) {
            socketRef.current.emit('connectRoom', selectedRoom.id, selectedRoom.name);
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
    }, [])

    return (
        <div className={style.chat}>
            <h3>Chat</h3>
            <div className="messages">
                <div className="messages__container">
                    <div className="messages__list">
                        {state.messages.map(item => {
                            return (
                                <div key={item.id} className={`messages__item ${item.author === state.currentUser ? 'messages__item_right' : ''}`}>
                                    <span>{item.author}</span>
                                    <hr />
                                    <span>{item.text}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea name="chatform" cols={30} rows={10} placeholder="Введите текст" onChange={handleChange}></textarea>
                <button type="submit">Отправить сообщение</button>
            </form>
            <div className="rooms">
                <ul>
                    {state.rooms.map(room => (
                        <React.Fragment key={room.id}>
                            <li onClick={() => connectRoom(room.id)}>{room.name}</li>
                            {room.active ? (<hr />) : null}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Chat
