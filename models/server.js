const express = require('express');
const { socketControler } = require('../sockets/controladorSockets');
require('dotenv').config();

class Server {


  constructor(app){
    this.app    = express();
    this.port   = process.env.PORT|| 3000;
    this.server = require('http').createServer(this.app);
    this.io     = require('socket.io')(this.server);

    this.paths = {
      usaurio:'/api/usuarios'
    };

    //midelware
    this.middelware();
    this.route();

    //Confiturar sockets eventos
    this.sockectsConfiguracion();

  }


  route(){
    //this.app.use(this.paths.usaurio,require('../route/users')); //cargamos las rutas de usuarios
  }

  middelware(){    
    this.app.use(express.static('public')); //directorio publico
  }


  sockectsConfiguracion(){
    
    this.io.on('connection',socketControler);

  }

  lister(){
    this.server.listen(this.port,()=>{
      console.log('Servidro corriendo en el puerto '+this.port);
    });

  }

}

module.exports=Server;