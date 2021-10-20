const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const { verifyAccessToken } = require("./middleware/auth");

dotenv.config();

const app = require("./app");
const chatControllet = require("./controllers/chat");

const port = process.env.PORT;
app.set("port", port);

const server = http.createServer(app);

// Покдлючение socket
const io = new Server(server, {
	cors: "*",
	connectTimeout: 5000,
});

// io.use((socket, next) => {
// 	next();
// 	// setTimeout(() => {
// 	// 	console.log(2);
// 	// 	next();
// 	// }, 2000);
// });
io.use((socket, next) => {
	try {
		verifyAccessToken(socket.request, {}, next);
	} catch (e) {
		console.log(e.message);
		next(e);
	}
});

io.on("connection", (socket) => {
	console.log(1);
	chatControllet.connect(io, socket);
});

// Подключение БД
mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb://localhost:27017/unknownappdb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	connectTimeoutMS: 1000,
	socketTimeoutMS: 1000,
}, (err) => {
	if (err) {
		return console.log(err);
	}
	server.listen(port, () => {
		console.log("Server started");
	});

	server.on("error", (err) => {
		throw err;
	});
});
