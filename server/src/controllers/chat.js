const Chat = require("../models/chat");

module.exports = (socket) => {
	console.log("User connected");

	const getRoom = async(roomId) => {
		const room = await Chat.findById({ _id: roomId }, (err, data) => data);
		
		// socket.in(roomId).emit("getRoom", roomId);
		socket.to(roomId).emit("getRoom", room);
		// socket.emit("getRoom", room);
	};
    
	const addMessage = (io, socket) => {
		const currentRoom = Chat.findById({ _id: socket.roomId }, (err, data) => data);
		console.log(currentRoom);
	};

	socket.on("connectRoom", ((roomId, roomName) => {
		// const data = socket.handshake.query;
		socket.join(roomId);
		console.log(socket.rooms);
		getRoom(roomId);
	}));

	socket.on("getRoom", getRoom);
};
