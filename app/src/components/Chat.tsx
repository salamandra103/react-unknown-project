import React, { useState, useRef, useEffect, useCallback, useMemo, FormEvent, UIEvent } from 'react'
import io, { Socket } from 'socket.io-client'

import api from "@/utils/api"

import style from '@styles/components/Chat.module.scss'
import { AxiosResponse } from 'axios'
import useChat from '@/hooks/useChat'

interface State {
    chatText: string,
    isCreateForm: boolean,
    createRoomName: string,
}

const Chat = () => {
    const messagesRef = useRef<HTMLDivElement | null>(null);

    const { socket, rooms, changeRoom, currentConnectedRoomId, fetchRooms } = useChat(messagesRef);

    const [state, setState] = useState<State>({
        chatText: '',
        isCreateForm: false,
        createRoomName: '',
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentConnectedRoomId) {
            if (socket && state.chatText.length) {
                socket.emit('addMessage', currentConnectedRoomId, state.chatText);
                setState({
                    ...state,
                    chatText: ''
                });
            }
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

    const currentMessages = useMemo(() => {
        if (rooms.length) {
            let currentRoom = rooms.find(room => room._id === currentConnectedRoomId);
            return currentRoom && currentRoom.messages.map(item => {
                return (
                    <div key={item._id} className={`messages__item`}>
                        <span className="messages__author">{item.author}</span>
                        <span>{item.value}</span>
                    </div>
                )
            });
        } else {
            return null;
        }
    }, [rooms])

    return (
        <div className={style.chat}>
            <div className="container">
                <div className="form">
                    <div className="messages">
                        <div className="messages__container">
                            <div className="messages__list" ref={messagesRef}>
                                {currentMessages}
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea name="chatText" value={state.chatText} cols={30} rows={10} placeholder="Введите текст" onChange={handleChange}></textarea>
                        <div className="buttons">
                            <button type="submit" disabled={!state.chatText.length}>Отправить</button>
                        </div>
                    </form>
                </div>
                <div className="rooms">
                    <h4>Комнаты</h4>
                    <ul>
                        {
                            rooms.map(room => (
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
