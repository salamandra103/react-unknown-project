import { useEffect, useRef, useState, useMemo } from "react";
import io, { Socket } from 'socket.io-client'
import { AxiosResponse } from 'axios'

import api from "@/utils/api"

interface State {
    rooms: Array<Room>,
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

const useChat = (messagesRef: any) => {
    const socketRef = useRef<Socket | null>(null);

    const [state, setState] = useState<State>({
        createRoomName: '',
        currentConnectedRoomId: null,
        rooms: [],
    });

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
        setState({
            ...state,
            currentConnectedRoomId: state.currentConnectedRoomId === e.currentTarget.value ? null : e.currentTarget.value,
            rooms: state.rooms.map(room => {
                if (room._id === e.currentTarget.value) {
                    selectedRoom = { ...room }
                    if (room.active) {
                        return {
                            ...room,
                            active: false,
                            messages: []
                        }
                    } else {
                        return {
                            ...room,
                            active: true,
                        }
                    }

                }
                return { ...room, active: false, messages: [] };
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

    const getMessage = async (messages: Array<Message>, isUpdate: boolean) => {
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
        }));

        if (messagesRef.current && !isUpdate) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }

    const addMessage = (newMessage: Message) => {
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
    }


    useEffect(() => {
        socketRef.current = io("http://localhost:3001", {
            query: {
                testValue: 'Test'
            }
        });

        socketRef.current.on('addMessage', addMessage);
        socketRef.current.on('getMessages', getMessage);

        fetchRooms();
    }, [])

    const lastCurrentMessageId = useMemo(() => {
        let currentRoom = state.rooms.find(room => room._id === state.currentConnectedRoomId);
        return currentRoom && currentRoom.messages.length ? currentRoom.messages[0] : null
    }, [state.rooms])

    useEffect(() => {
        let onScroll = (e: any) => {
            if (e.currentTarget.scrollTop <= 100 && socketRef.current) {
                socketRef.current.emit('getMessages', state.currentConnectedRoomId, lastCurrentMessageId && lastCurrentMessageId._id, 5)
            }
        }
        if (socketRef.current && state.currentConnectedRoomId) {
            messagesRef.current && messagesRef.current.addEventListener('scroll', onScroll)
        }
        return () => {
            messagesRef.current && messagesRef.current.removeEventListener('scroll', onScroll)
        }
    }, [state.rooms])

    return {
        socket: socketRef.current,
        rooms: state.rooms,
        currentConnectedRoomId: state.currentConnectedRoomId,
        changeRoom,
        fetchRooms
    }
}

export default useChat;