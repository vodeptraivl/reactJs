var express = require('express');
// const cors = require('cors');
var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(express.static('public'));
// app.set('view engine','ejs');
// app.set('views','./views');

var server = require('http').Server(app);

var io = require('socket.io')(server,{path: '/vola/chat'});

server.listen(process.env.PORT || 2000);



var users = [];

io.on('connection',function(socket){
    let auth = socket.handshake.auth;
    auth.idSocket = socket.id;
    users.push(auth);
    io.sockets.emit('newUsers',users);
    socket.on('disconnect',_=>{
        users = users.filter(x=>{return x.idSocket != socket.id});
        io.sockets.emit('newUsers',users);
        
    });
    socket.on('getAllUsers',_=>{
        socket.emit('users',users);
    });
    socket.on('sendMessage',(message)=>{
        io.sockets.emit('newMessage',{auth,message})
    });
});


//io.sockets.emit; // all body can see
//socket.emit //only you see
//socket.broadcast.emit //all body can see but you not