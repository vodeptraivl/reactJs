var express = require('express');

var app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

var server = require('http').Server(app);
var io = require('socket.io')(server,{path: 'vola/chat'});

server.listen(process.env.PORT || 3000);
var nameuser = [];

io.on('connection',function(socket){
    socket.on('client-sent-name',function(data){
        console.log(socket)
        if(nameuser.indexOf(data)>=0){
            console.log("ton tai")
        }else{
            nameuser.push(data);
            socket.Username = data;
            socket.emit('Server-send-dk-tc', data  );
            socket.broadcast.emit('Server-send-newuser', data);
            io.sockets.emit("sv-send-ds-user",nameuser);
        }
    });
   
    socket.on('disconnect',function(){
        if(socket.Username){
            nameuser.splice(
                nameuser.indexOf(socket.Username),1
            );
            socket.emit('Server-log-al',socket.Username);
        }
        socket.broadcast.emit("sv-send-ds-user", nameuser );
        
    });
    socket.on('logout' ,function(){
        nameuser.splice(
            nameuser.indexOf(socket.Username),1
        );
        socket.broadcast.emit("sv-send-ds-user", nameuser );
        socket.broadcast.emit('Server-log-al',socket.Username);
        socket.emit('Server-logout','thanhcong');
    });
    socket.on('contentmess',function(data){
        console.log(socket)
        io.sockets.emit('sv-data-mess', socket.Username + ' : ádsad' + data  );
    });
    
    
});

app.get('/',function(req,res){
    res.render('home');
})


//io.sockets.emit; // all body can see
//socket.emit //only you see
//socket.broadcast.emit //all body can see but you not