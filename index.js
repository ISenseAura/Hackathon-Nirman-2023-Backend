const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
var http = require("http");
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

const socketIo = require('socket.io')


const server = http.createServer(app)
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
})
 //in case server and client run on different urls
io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  
  socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })

  socket.on('hey',(reason)=>{
    console.log("heyyyyyyyyyyyyy")
  })

  socket.on("test",() => {
    console.log("tesstt");
  })
})
setInterval(()=>{
     io.to('clock-room').emit('time', new Date())
},1000)

server.listen(process.env.PORT, err=> {
  if(err) console.log(err)
  console.log('serrver running on Port ', process.env.PORT)
})


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

