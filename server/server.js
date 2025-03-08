const express = require("express");
const dotenv = require("dotenv").config();
const cookie = require("cookie-parser");
const cors = require("cors");

const { errorHandler } = require("./Middlewares/errors");
const mongoDbConnection = require("./Middlewares/db");
const auth = require("./Routes/auth");
const blogs = require("./Routes/blogs");
const user = require("./Routes/user");
const server = express();

server.use(express.json());
server.use(cookie());
server.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

const Port = process.env.PORT || 5000;

server.use("/api/auth", auth);
server.use("/api/blog", blogs);
server.use("/api/user", user);

server.use(errorHandler);
const expressServer = server.listen(Port, () => {
  mongoDbConnection();
  console.log(`server is running on port : ${Port}`);
});


// const io = require('socket.io')(expressServer, ({
//   cors : {
//     origin : "http://localhost:5000/"
//   }
// }))

// io.on('connection' , socket => {
//   socket.emit('welcome' , {id : socket.id})

//   socket.on('message', ({username, message , socketId }) =>{
//     socket.emit('msgResponse',{username,message, resId:socketId, time : "18:34 am"})
//   })
// })
