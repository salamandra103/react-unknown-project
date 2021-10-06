const Chat = require("../models/chat");

module.exports = (socket) => {
	console.log("User connected");

	const getRoom = (roomId) => {
		const room = Chat.findById({ _id: roomId }, (err, data) => data);
	};
    
	const addMessage = (io, socket) => {
		const currentRoom = Chat.findById({ _id: socket.roomId }, (err, data) => {
			console.log(data);
			return data;
		});
		console.log(currentRoom);
	};

	socket.on("connectRoom", ((roomId, roomName) => {
		const data = socket.handshake.query;
		console.log(data);
		socket.join(roomId);

		socket.emit("getRoom", getRoom);
	}));
};
