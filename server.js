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

    // Signaling
    socket.on("offer-front", (data) => socket.broadcast.emit("offer-front", data));
    socket.on("answer-front", (data) => socket.broadcast.emit("answer-front", data));
    socket.on("ice-front", (data) => socket.broadcast.emit("ice-front", data));

    // Remote Commands
    socket.on("switch-camera", (toId) => io.to(toId).emit("switch-camera"));
    socket.on("toggle-torch", (toId) => io.to(toId).emit("toggle-torch"));
    
    // Status Updates
    socket.on("status-update", (data) => {
        socket.broadcast.emit("status-update", { ...data, id: socket.id });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

