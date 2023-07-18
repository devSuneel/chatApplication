
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const { Server } = require("socket.io");
const io = new Server(http);

http.listen(PORT,()=>{
    console.log("server run",PORT)
})
app.use(express.static(__dirname+"/public"));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
    // res.send("Hello world");
})

// socket

io.on('connection',(socket)=>{
    console.log("connected");
    socket.on("message",(msg)=>{
        console.log(msg)
        socket.broadcast.emit("message",msg);
    })
})