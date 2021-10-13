import React, { useState, useRef, useEffect, useCallback, useMemo, FormEvent, UIEvent } from 'react'
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
    _id: string,
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
    const messagesRef = useRef<HTMLDivElement | null>(null);

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

    const fetchMessages = async (roomId: string, oldMessageId: string) => {

    }

    const fetchRooms = async () => {
        try {
            let { data: rooms }: AxiosResponse<any[]> = await api.get('chat/room');
            setState(state => ({
                ...state,
                rooms: rooms.map((room) => {
                    return {
                        ...room,
                        active: false,
                    }
                })
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const changeRoom = async (e: React.FormEvent<HTMLInputElement>): Promise<any> => {
        let selectedRoom: {
            _id?: string,
            name?: string,
            active?: boolean
        } = {};
        let currentTarget = e.currentTarget;
        setState({
            ...state,
            currentConnectedRoomId: state.currentConnectedRoomId === currentTarget.value ? null : currentTarget.value,
            rooms: state.rooms.map(room => {
                if (room._id === currentTarget.value) {
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
                socketRef.current.emit('connectRoom', selectedRoom._id);
            } else {
                socketRef.current.emit('disconnectRoom', selectedRoom._id);

            }
        }
    }

    const lastCurrentMessageId = useMemo(() => {
        let currentRoom = state.rooms.find(room => room._id === state.currentConnectedRoomId);
        return currentRoom && currentRoom.messages.length ? currentRoom.messages[0]._id : null
    }, [state.rooms])

    useEffect(() => {
        let onScroll = (e: any) => {
            if (e.currentTarget.scrollTop === 0 && socketRef.current) {
                socketRef.current.emit('getMessages', state.currentConnectedRoomId, lastCurrentMessageId)
            }
        }
        if (socketRef.current && state.currentConnectedRoomId) {
            messagesRef.current && messagesRef.current.addEventListener('scroll', onScroll)
        } else {
            messagesRef.current && messagesRef.current.removeEventListener('scroll', onScroll)
        }

        return () => {
            messagesRef.current && messagesRef.current.removeEventListener('scroll', onScroll)

        }
    }, [state.rooms])




    useEffect(() => {
        socketRef.current = io("http://localhost:3001", {
            query: {
                testValue: 'Test'
            }
        });

        socketRef.current.on('addMessage', (newMessage) => {
            setState((state) => ({
                ...state,
                rooms: state.rooms.map(room => {
                    if (room._id === state.currentConnectedRoomId) {
                        let messages = room.messages;
                        messages.push(newMessage);
                        return {
                            ...room,
                            messages
                        }
                    }
                    return room
                })
            }));
            if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
        });

        socketRef.current.on('getMessages', (messages, isUpdate = false) => {
            setState(state => ({
                ...state,
                rooms: state.rooms.map(room => {
                    if (room._id === state.currentConnectedRoomId) {
                        return {
                            ...room,
                            messages: isUpdate ? [
                                ...messages,
                                ...room.messages
                            ] : [...messages]
                        }
                    }
                    return room;
                })
            }))
            if (messagesRef.current) {
                if (isUpdate) {
                    messagesRef.current.scrollTop = messagesRef.current.scrollTop + 50
                } else {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
                }
            }
        });

        fetchRooms();
    }, []);

    let currentMessages = () => {
        if (state.rooms.length) {
            let currentRoom = state.rooms.find(room => room._id === state.currentConnectedRoomId);
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
                            <div className="messages__list" ref={messagesRef}>
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
                                <li key={room._id}>
                                    <label>
                                        <input type="checkbox" onChange={changeRoom} checked={room.active} name="rooms" value={room._id} />
                                        <span>{room.name}</span>
                                    </label>
                                    <span className={room.active ? 'delete white' : 'delete'} onClick={() => removeRoom(room._id)}>X</span>
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
