exports.onConnection = (socket) => {
	console.log("User connected");

	socket.on("connectRoom", ((roomId, roomName) => {
		// const { roomId, roomName } = socket.handshake.query;
		socket.join(roomId);
	}));
};
