const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
var http = require('http').createServer(app);
const router = express.Router();
const firebase = require("./firebase-init");

const database = require("./firebase-init")
const {
    signup,
    signin,
    deleteUser,
    forgetPassword,
    verifyEmail,
  } = require("./routes/auth");



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

<<<<<<< HEAD
app.use("/signup",router.post("/signup", signup));

router.post("/signin", signin);
router.post("/delete", deleteUser);

app.use("/",router.post("/forget-password", forgetPassword))


app.use("/t",require("./routes/login") );


/*
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

const clients = {};

// A new client connection request received
wss.on('connection', function(connection) {
  // Generate a unique code for every user
  const userId = "uuidv4()";
  console.log(`Recieved a new connection.`);
  broadcastMessage({type:"test",message:"tttt"});
  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
});

function broadcastMessage(json) {
    // We are sending the current data to all connected active clients
    const data = JSON.stringify(json);
    for(let userId in clients) {
      let client = clients[userId];
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    };
  }
*/


  var io = require('socket.io')(http);

  var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}]; 


  io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth-token');

    res.setHeader('Access-Control-Allow-Credentials', 1);

    next();
});

let cors = require("cors");
app.use(cors());


http.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});
=======
app.use("/t", require("./Routes/login"));

app.get('*', function(request, response) {
    if (request.method === 'GET') {
        const error = {
            status: '402',
            errMessages: "Wrong endpoint?",
            tips: '/'
        }
        return response.status(402).json(error)
    }
});
app.listen(process.env.PORT, () => {
  console.log(`The application is running on ${process.env.PORT}`);
});
>>>>>>> ac8512b7b0b631b66a7acecd5c4633e1f7a53efb
