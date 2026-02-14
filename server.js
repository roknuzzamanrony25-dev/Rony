const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // WebRTC Signaling Logic
    socket.on("offer", (data) => socket.broadcast.emit("offer", data));
    socket.on("answer", (data) => socket.broadcast.emit("answer", data));
    socket.on("ice", (data) => socket.broadcast.emit("ice", data));

    // 🔄 Remote Camera Switch Signal
    socket.on("switch", () => {
        socket.broadcast.emit("switch");
    });

    // 💡 Remote Flashlight (Torch) Signal
    socket.on("torch", () => {
        socket.broadcast.emit("torch");
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Live on Port ${PORT}`));
