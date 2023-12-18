const TicketControl = require("../models/ticket-control");

const tiketControl = new TicketControl;

const socketControler =(sockect)=>{
    //sockect.on('disconnect',()=>{});

    sockect.emit('estado-actual',tiketControl.utlimos4);
    sockect.emit('ultimo-ticket',tiketControl.ultimo);
    sockect.emit('tickets-pendiente',tiketControl.tickets.length);


    sockect.on('siguiente-tickect',(payload,callback)=>{
      
      
      const siguiente = tiketControl.siguiente();
      
      callback(siguiente);
      
      sockect.broadcast.emit('tickets-pendiente',tiketControl.tickets.length);
      //TODO: notificar que hay un nuevo tikeyt por asignar

    });

    sockect.on('atendet-ticket',({escritorio},callback)=>{
      
      const ticket = tiketControl.atenderTiket(escritorio);
      sockect.broadcast.emit('estado-actual',tiketControl.utlimos4);
      sockect.emit('tickets-pendiente',tiketControl.tickets.length);//Emmitir solo a una persona
      sockect.broadcast.emit('tickets-pendiente',tiketControl.tickets.length); //Esto es para emmitir a todo el mundo


      if(!escritorio){
        return callback({
          ok:false,
          msg:'El escritorio es obligatorio'
        })
      }

      if(!ticket){
        return callback({
          ok:false,
          msg:'Ya no hay tikects pendientes'
        });
      }

      return callback({
        ok:true,
        ticket
      });

      

    });

}

module.exports = {
  socketControler
}