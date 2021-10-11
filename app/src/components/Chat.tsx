import React, { useState, useRef, useEffect, useCallback, useMemo, FormEvent } from 'react'
import io, { Socket } from 'socket.io-client'

import api from "@/utils/api"

import style from '@styles/components/Chat.module.scss'
import { AxiosResponse } from 'axios'

interface State {
    currentUser: string,
    chatform: string,
    rooms: Array<Room>,
    isCreateForm: boolean,
    createRoomName: string,
    currentConnectedRoomId: string | null
}

interface Room {
    id: string,
    name?: string,
    active: boolean,
    messages: Array<Message>,
}

interface Message {
    value: string,
    author?: string,
    _id: string
}

const Chat = () => {
    const socketRef = useRef<Socket | null>(null);
    const [state, setState] = useState<State>({
        currentUser: 'user_1',
        chatform: '',
        isCreateForm: false,
        createRoomName: '',
        currentConnectedRoomId: null,
        rooms: [],
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socketRef.current) {
            socketRef.current.emit('addMessage', state.currentConnectedRoomId, state.chatform);
            setState({
                ...state,
                chatform: ''
            });
        }
    }

    const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('chat/room', {
                name: state.createRoomName
            });
            setState((state) => ({
                ...state,
                isCreateForm: !state.isCreateForm,
                createRoomName: '',
            }));
            await fetchRooms();
        } catch (error) {
            console.error(error);
        }
    }

    const removeRoom = async (id: string) => {
        try {
            await api.delete('chat/room', { data: { id } })
            fetchRooms();
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRooms = async () => {
        try {
            let { data: rooms }: AxiosResponse<any[]> = await api.get('chat/room');
            rooms = rooms.map(({ _id, name, messages }) => {
                return {
                    id: _id,
                    name,
                    messages,
                    active: false,
                }
            })
            setState(state => ({
                ...state,
                rooms
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const changeRoom = async (e: React.FormEvent<HTMLInputElement>): Promise<any> => {
        let selectedRoom: {
            id?: string,
            name?: string,
            active?: boolean
        } = {};
        setState({
            ...state,
            currentConnectedRoomId: state.currentConnectedRoomId === e.currentTarget.value ? null : e.currentTarget.value,
            rooms: state.rooms.map(room => {
                if (room.id === e.currentTarget.value) {
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
            if (!selectedRoom.active) {
                socketRef.current.emit('connectRoom', selectedRoom.id)
            } else {
                socketRef.current.emit('disconnectRoom', selectedRoom.id)
            }
        }
    }

    useEffect(() => {
        socketRef.current = io("http://localhost:3001", {
            query: {
                testValue: 'Test'
            }
        });

        socketRef.current.on('getMessage', (newMessages) => {
            setState((state) => ({
                ...state,
                rooms: state.rooms.map(room => {
                    if (room.id === state.currentConnectedRoomId) {
                        let messages = room.messages;
                        messages.push(newMessages);
                        return {
                            ...room,
                            messages
                        }
                    }
                    return room
                })
            }));
        });

        fetchRooms();
    }, []);

    let currentMessages = () => {
        if (state.rooms.length) {
            let currentRoom = state.rooms.find(room => room.id === state.currentConnectedRoomId);
            return currentRoom && currentRoom.messages.map(item => {
                return (
                    <div key={item._id} className={`messages__item ${item.author === state.currentUser ? 'messages__item_right' : ''}`}>
                        <span className="messages__author">{item.author}</span>
                        <span>{item.value}</span>
                    </div>
                )
            });
        } else {
            return null;
        }
    }

    return (
        <div className={style.chat}>
            <div className="container">
                <div className="form">
                    <div className="messages">
                        <div className="messages__container">
                            <div className="messages__list">
                                {currentMessages()}
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea name="chatform" value={state.chatform} cols={30} rows={10} placeholder="Введите текст" onChange={handleChange}></textarea>
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
                                        <input type="checkbox" onChange={changeRoom} checked={room.active} name="rooms" value={room.id} />
                                        <span>{room.name}</span>
                                    </label>
                                    <span className={room.active ? 'delete white' : 'delete'} onClick={() => removeRoom(room.id)}>X</span>
                                </li>
                            ))
                        }
                        <li className={!state.isCreateForm ? "plus" : 'plus minus'} onClick={() => setState({ ...state, isCreateForm: !state.isCreateForm })}></li>
                    </ul>
                </div>
                {
                    state.isCreateForm ? (
                        <div className="create">
                            <h4>Создание новой комнаты</h4>
                            <form onSubmit={createRoom}>
                                <input name="createRoomName" type="text" placeholder="Введите название комнаты" onChange={handleChange} />
                                <button type="submit">Создать</button>
                            </form>
                        </div>
                    ) : null
                }

            </div>
        </div>
    )
}

export default Chat
