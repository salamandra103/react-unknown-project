const Chat = require("../models/chat");

exports.connect = (socket) => {
	console.log("User connected");

	const getRoom = async(roomId) => {
		const room = await Chat.findById(roomId, (err, data) => data);
		socket.to(roomId).emit("getRoom", room);
	};
    
	const addMessage = (io, socket) => {
		const currentRoom = Chat.findById(socket.roomId, (err, data) => data);
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

exports.createRoom = (req, res, next) => {
	Chat.create({
		name: req.body.name,
	}, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};

exports.deleteRoom = (req, res, next) => {
	console.log(req.body);
	Chat.findByIdAndDelete(req.body.id, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json({ id: data._id });
		}
	});
};

exports.getRooms = (req, res, next) => {
	Chat.find({}, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};
