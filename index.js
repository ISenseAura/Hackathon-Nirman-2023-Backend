const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
var http = require("http").createServer(app);
const router = express.Router();
const firebase = require("./firebase-init");

global.users = require("./users");

const database = require("./firebase-init")
const {
    signup,
    signin,
    deleteUser,
    forgetPassword,
    getUser,
    verifyEmail,
    updateUser
  } = require("./routes/auth");

  //users.init();


app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,auth-token"
  );

  res.setHeader("Access-Control-Allow-Credentials", 1);

  next();
});

app.use("/signup",router.post("/signup", signup));

router.post("/signin", signin);
router.post("/getuser", getUser);
router.post("/delete", deleteUser);
router.post("/updateuser", updateUser);

app.use("/", router.post("/forget-password", forgetPassword));

app.use("/t", require("./routes/login"));

var io = require("socket.io")(http);

var STATIC_CHANNELS = [
  {
    name: "Global chat",
    participants: 0,
    id: 1,
    sockets: [],
  },
  {
    name: "Funny",
    participants: 0,
    id: 2,
    sockets: [],
  },
];

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("channel-join", (id) => {
    console.log("channel join", id);
    STATIC_CHANNELS.forEach((c) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });
  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      let index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,auth-token"
  );

  res.setHeader("Access-Control-Allow-Credentials", 1);

  next();
});

let cors = require("cors");
//const { getUser } = require("./users");
app.use(cors());

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
