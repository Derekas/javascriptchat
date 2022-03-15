//requerimos http para utilizar el servidor 
const http= require('http')
const path = require('path');
const express= require('express');

const socketio=require('socket.io');


const app= express();
//creamos la constante del server y creamos el server
const server=http.createServer(app);
//añadimos al socket el servidor
const io= socketio(server);

app.set('port',process.env.PORT||3000);

require('./sockets')(io);
//cada vez que un usuario entra inicia la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//conecta al puerto 3000 y enseña el mensaje
server.listen(app.get('port'), ()=>{
    console.log('server on port 3000')
});

