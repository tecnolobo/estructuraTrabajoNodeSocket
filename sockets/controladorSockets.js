const socketControler =(sockect)=>{

    console.log('Cliente conectado id='+sockect.id);

    sockect.on('disconnect',()=>{

    });

    sockect.on('enviar-mensaje-cliente',(payload,callback)=>{
      //enviar mensaje a todos los clientes conectado
      sockect.broadcast.emit('enviar-mensaje-server',payload);
      const id =45454;
      callback(id);
    })


}

module.exports = {
  socketControler
}