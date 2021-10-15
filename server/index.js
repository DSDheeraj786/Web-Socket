// const io = require("socket.io")(8000);
const express = require('express');
const app = express();
const port = 5000;

app.use(require('cors')())
app.use(express.static(__dirname));

// enable CORS option (If you are using Socket.IO v3)
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
})

const users = [];

io.on("connection", (socket) => {
  // either with send()
  socket.on("new-user-joined", (name) => {
    console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {message, name : users[socket.id]});
  });

  socket.on("disconnect", (name) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


