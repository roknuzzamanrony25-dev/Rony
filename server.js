const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static("public"));

io.on("connection", (socket) => {
    socket.on("offer", (data) => socket.broadcast.emit("offer", data));
    socket.on("answer", (data) => socket.broadcast.emit("answer", data));
    socket.on("ice", (data) => socket.broadcast.emit("ice", data));
    socket.on("switch", () => socket.broadcast.emit("switch"));
    socket.on("torch", () => socket.broadcast.emit("torch"));
    socket.on("status", (data) => socket.broadcast.emit("status", { ...data, id: socket.id }));
    socket.on("disconnect", () => socket.broadcast.emit("left", socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server Live"));
