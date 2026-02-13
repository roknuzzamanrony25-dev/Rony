const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("ready", () => socket.broadcast.emit("ready"));

    // Front Camera Events
    socket.on("offer-front", (data) => socket.broadcast.emit("offer-front", data));
    socket.on("answer-front", (data) => socket.broadcast.emit("answer-front", data));
    socket.on("ice-front", (data) => socket.broadcast.emit("ice-front", data));

    // Back Camera Events
    socket.on("offer-back", (data) => socket.broadcast.emit("offer-back", data));
    socket.on("answer-back", (data) => socket.broadcast.emit("answer-back", data));
    socket.on("ice-back", (data) => socket.broadcast.emit("ice-back", data));

    // Remote Camera Switch Command
    socket.on("switch-camera", () => {
        console.log("Switching Camera Request...");
        socket.broadcast.emit("switch-camera");
    });

    socket.on("disconnect", () => console.log("User Disconnected"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

