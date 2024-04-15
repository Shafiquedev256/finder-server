const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const router = require("./routes/user");
const io = socketio(server);

mongoose.connect(process.env.DATA_BASE).then(() => console.log("connected"));

io.on("connection", (socket) => {
  console.log("new user has connected to  the community");

  //joining the community chatroom
  socket.join("community");

  socket.on("sendMessage", (msg) => {
    const { text, room, user, date } = msg;
    const chart = {
      text,
      user,
      room,
      date,
    };
    io.to("community").emit("message", chart);
    console.log("message sent");
  });
});

app.use(cors());
app.use(express.json());
app.use("/user/", router);
server.listen(4000, () => console.log("listening"));
