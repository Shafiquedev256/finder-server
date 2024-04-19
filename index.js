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
const OldMessages = require("./models/messages");

mongoose.connect(process.env.DATA_BASE).then(() => console.log("connected"));

const setOldChart = async (chart) => {
  const addChart = new OldMessages(chart);
  const save = await addChart.save();
}; //This function adds old charts to database

let oldmessagesStore = [];
const getOldCharts = async () => {
  const charts = await OldMessages.find();
  oldmessagesStore = charts;
};
getOldCharts(); //This function is getting all old charts in the database

io.on("connection", (socket) => {
  socket.join("community");

  socket.on("sendMessage", (msg) => {
    const { text, room, user, date } = msg;
    const chart = {
      text,
      user,
      room,
      date,
    };
    setOldChart(chart); //adding message to old chats
    io.to("community").emit("message", chart);
  });

  socket.on("oldMessages", (room) => {
    const oldEl = oldmessagesStore.filter((item) => item.room === room.room);
    io.to(room.room).emit("oldmessages", { old: oldEl });
  }); //sending old messsages to user
});

app.use(cors());
app.use(express.json());
app.use("/user/", router);
server.listen(4000, () => console.log("listening"));
