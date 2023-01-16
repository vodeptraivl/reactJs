var express = require('express');
const oracledb = require('oracledb');
const bodyParser = require("body-parser");
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
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('view engine','ejs');
// app.set('views','./views');

var server = require('http').Server(app);

var io = require('socket.io')(server,{path: '/vola/chat'});

server.listen(process.env.PORT || 2000);



var users = [];
var interval;
io.on('connection',function(socket){
    let auth = socket.handshake.auth;
    auth.idSocket = socket.id;
    let usr = users.findIndex(x=> {return(x.id == auth.id || x.name == auth.name)});
    if(usr == -1){
        users.push(auth);
    }else{
        users[i].idSocket = socket.id;
    }
    io.sockets.emit('allUsers',users);
    socket.on('disconnect',_=>{
        users = users.filter(x=>{return x.id != auth.id});
        io.sockets.emit('allUsers',users);
        
    });
    socket.on('getAllUsers',_=>{
        socket.emit('users',users);
    });

    socket.on('sendMessage',(content)=>{
        if(content.idSk){
            let private = {
                auth,
                message:content.message,
                usrFrom : content.usrFrom,
                from:content.from,
                to : content.id
            }
            socket.emit('newMessageForMe',private)
            socket.to(content.idSk).emit("newPrivateMessage",private);
        }else{
            io.sockets.emit('newMessage',{auth,message:content.message,to:'market',usrFrom:'market'})
        }
    });
    socket.on("toUser", (id, msg) => {
        socket.to(id).emit("privateMessage", msg);
    });
    // interval = setInterval(_=>{
    //     users = []
    //     io.sockets.emit('ping',null);
    // },1000);

    // socket.on('pong',data=>{
    //     let auth = socket.handshake.auth;
    //     auth.idSocket = socket.id;
    //     if(users.find(x=>x.idSocket == socket.id) == null){
    //         users.push(auth);
    //         io.sockets.emit('allUsers',users);
    //     }
    // });    
});


async function getConnection(){
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "VOLA",
            password: "VOLA",
            connectionString: "192.168.1.60:1521/DBSF"
        });
        return connection;
    } catch (err) {
        console.log(err)
    } 
}

app.post('/dangnhap',async (req, res) => {
	let check = await checkLogin(req.body);
    if(check && check.length > 0){
        console.log(check)
        let userInfo = {
            uuid : check[0].UUID,
            userName : check[0].USRNM
        }
        return res.send({ error: false, userInfo})
    }
    return res.send({ error: true})
})

async function checkLogin(usr){
    const connection = await getConnection();
    let sql = `
        select uuid ,usrnm from usr where
        usrNm = '${usr.userName}'
        and pwd = '${usr.password}'
        and rownum = 1
    `;

    try{
        let usr = await connection.execute(sql,[],{outFormat: oracledb.OBJECT});
        return usr.rows
    }
    catch (e){
        console.log(e)
    } finally{
        if (connection) {
            try {
              await connection.close();
            } catch(err) {
              console.log('Error in closing connection:\n', err);
            }
        }
    }
}

app.post('/dangky',async (req, res) => {
	let check = await checkdangky(req.body);
    if(check && check.length == 0){
        let regis = await dangky(req.body);
        if(regis == false){
            return res.send({ error: false, userInfo:req.body})
        }
    }
    return res.send({ error: true })
});

async function dangky(usr){
    const connection = await getConnection();
    let error = false;
    let sql = `
        insert into usr ( uuid,usrnm,pwd) values (
            '${usr.uuid}',
            '${usr.userName}',
            '${usr.password}'
        )
    `;

    try{
        await connection.execute(sql,[],{outFormat: oracledb.OBJECT});
        connection.commit()
    }
    catch (e){
        error = true;
    } finally{
        if (connection) {
            try {
              await connection.close();
            } catch(err) {
              console.log('Error in closing connection:\n', err);
            }
        }
        return error;
    }
}

async function checkdangky(usr){
    const connection = await getConnection();
    let sql = `
        select uuid from usr where
        usrNm = '${usr.userName}'
        and rownum = 1
    `;

    try{
        let usr = await connection.execute(sql,[],{outFormat: oracledb.OBJECT});
        return usr.rows
    }
    catch (e){
        console.log(e)
    } finally{
        if (connection) {
            try {
              await connection.close();
            } catch(err) {
              console.log('Error in closing connection:\n', err);
            }
        }
    }
}