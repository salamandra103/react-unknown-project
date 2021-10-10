const Chat = require("../models/chat");

exports.connect = (io, socket) => {
	const getRoom = async(roomId) => {
		console.log("connected room");
		const currentRoom = await Chat.findById(roomId, (err, data) => data);
		const rooms = socket.rooms.values();
		if (socket.rooms.size) {
			const firstRoom = rooms.next().value;
			io.to(firstRoom).emit("getRoom", currentRoom);
		}
	};
    
	const addMessage = async(roomId, newMessage) => {
		const targetRoom = await Chat.findById(roomId);
		targetRoom.messages.push({
			value: newMessage,
		});
		const { messages } = await targetRoom.save();
		io.to(roomId).emit("getMessage", messages);
		
		// Chat.findByIdAndUpdate(roomId, {
		// 	messages: [
		// 		...data.messages,
		// 		{
		// 			value: newMessage,
		// 		},
		// 	],
		// }, { new: true }, (err, _data) => {
		// 	console.log(_data);
		// });
	};

	socket.on("connectRoom", ((roomId) => {
		socket.join(roomId);
		getRoom(roomId);
	}));

	socket.on("disconnectRoom", (roomId) => {
		socket.leave(roomId);
	});

	socket.on("addMessage", addMessage);
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
