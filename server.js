require("dotenv").config();
const PORT = process.env.PORT || process.env.DEV_PORT;

const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: process.env.CORES_ORIGIN,
    methods: ["GET", "POST"],
  }
});

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users'); // New Version

io.on("connection", (socket) => {

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room} room.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', ({ message }) => {
    let user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

});

// ----- for keep-them-together deploy -----

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// ----------

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});