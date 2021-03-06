import { useEffect, useRef, useState, useMemo, useCallback, useContext } from "react";
import io, { Socket } from 'socket.io-client'
import { AxiosResponse } from 'axios'

import { AuthContext } from "@/contexts/auth";

import api from "@/utils/api"
import { LoaderOptionsPlugin } from "webpack";

interface State {
    rooms: Array<Room>,
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
    const messagesScrolledRef = useRef<boolean>(false);
    const lastCurrentMessagesId = useRef<string>('');
    const auth = useContext(AuthContext);

    const [state, setState] = useState<State>({
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
        messagesScrolledRef.current = false;
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
                debugger
                if (room._id === state.currentConnectedRoomId) {
                    let newMessages = isUpdate ? [
                        ...messages,
                        ...room.messages
                    ] : [...messages]
                    lastCurrentMessagesId.current = newMessages[0]._id;

                    return {
                        ...room,
                        messages: newMessages
                    }
                }
                return room;
            })
        }));

        if (messagesRef.current && !isUpdate) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
        setTimeout(() => {
            messagesScrolledRef.current = true;
        }, 0)

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

    const onScroll = useCallback((e: any) => {
        if (e.currentTarget.scrollTop <= 100 && socketRef.current && messagesScrolledRef.current && lastCurrentMessagesId.current) {
            messagesScrolledRef.current = false;
            socketRef.current.emit('getMessages', state.currentConnectedRoomId, lastCurrentMessagesId.current, 5)
        }
    }, [lastCurrentMessagesId.current])

    useEffect(() => {
        socketRef.current = io("http://localhost:3001", {
            // auth: {
            //     token: 'dsad'
            // },
            // reconnection: false,
            extraHeaders: {
                'Authorization': (auth && auth.user) ? auth.user.accessToken : ''
            },
            query: {
                testValue: 'Test'
            }
        });

        socketRef.current.on('addMessage', addMessage);
        socketRef.current.on('getMessages', getMessage);
        socketRef.current.on("connect_error", async (err) => {
            if (err.message === 'jwt expired') {
                await auth.updateToken();
            }

            if (err.message === "Refresh token expired") {
                localStorage.removeItem("user_info");
            }
        });
        socketRef.current.on("disconnect", () => {
            socketRef.current?.connect();
        });

        return () => {
            socketRef.current && socketRef.current.disconnect()
        }
    }, [auth])

    useEffect(() => {
        fetchRooms();
    }, [])

    useEffect(() => {
        if (socketRef.current && state.currentConnectedRoomId && messagesRef.current) {
            messagesRef.current.addEventListener('scroll', onScroll)
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