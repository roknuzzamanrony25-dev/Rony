const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Camera signals
    socket.on("offer", (data) => socket.broadcast.emit("offer", data));
    socket.on("answer", (data) => socket.broadcast.emit("answer", data));
    socket.on("ice", (data) => socket.broadcast.emit("ice", data));

    // Remote Switch Camera command
    socket.on("switch", () => {
        socket.broadcast.emit("switch");
    });

    socket.on("disconnect", () => console.log("User Disconnected"));
});

server.listen(3000, () => console.log("Server Live on http://localhost:3000"));
