
module.exports=function(io){
    let nicknames=[];
    //io tiene todos los usuarios conectados, entonces si queremos enviar algo a todos los usuarios
    //utilizaremos el io.emit()
    io.on('connection',socket =>{
    console.log('uun nuervo usuario connectado');

    socket.on('new user', (data,cb)=>{
        console.log(data);
        if(nicknames.indexOf(data)!=-1){
            cb(false);
        }else{
            cb(true);
            socket.nickname=data;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames', nicknames)
        }
    });

    socket.on('send message', data=>{

        io.sockets.emit('new message', {
            msg:data,
            nick:socket.nickname
        });

    });
    
    socket.on('disconnect', data=>{

        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname),1);
        io.sockets.emit('new message', data);
    });
    
});
}
