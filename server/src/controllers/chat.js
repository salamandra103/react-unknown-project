const Chat = require("../models/chat");

exports.connect = (io, socket) => {
	const getMessages = async(roomId, oldMessageId) => {
		const currentRoom = await Chat.findById(roomId, (err, data) => data);
		const currentRoomMessages = [...currentRoom.messages];

		const rooms = socket.rooms.values();
		if (socket.rooms.size) {
			const firstRoom = rooms.next().value;

			io.to(firstRoom).emit("getMessages", currentRoomMessages.slice(-10));
		}
	};
    
	const addMessage = async(roomId, newMessage) => {
		const targetRoom = await Chat.findById(roomId);
		targetRoom.messages.push({
			value: newMessage,
		});
		const { messages } = await targetRoom.save();
		io.to(roomId).emit("addMessage", ...messages.slice(-1));
	};

	const connectRoom = (roomId) => {
		socket.join(roomId);
		getMessages(roomId);
	};

	const disconnectRoom = (roomId) => {
		socket.leave(roomId);
	};

	socket.on("connectRoom", connectRoom);
	socket.on("disconnectRoom", disconnectRoom);
	socket.on("addMessage", addMessage);
	socket.on("getMessages", getMessages);
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
		const result = data.map((room) => ({
			name: room.name,
			_id: room._id,
			// messages: room.messages.splice(-10),
			messages: [],
		}));
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(result);
		}
	});
};
