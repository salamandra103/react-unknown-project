const path = require("path");

const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const jsonParser = bodyParser.json();

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");

// const logStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(express.static("public"));
// app.use(logger("dev", { stream: logStream }));
app.use(logger("dev"));
app.use(jsonParser);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routers use
app.use("/api/auth/", authRouter);
app.use("/api/dashboard/", dashboardRouter);
app.use("/api/chat/", chatRouter);
app.use("/api/user/", userRouter);

// Catch 404
app.use((req, res, next) => {
	next(createError(404));
});

module.exports = app;
