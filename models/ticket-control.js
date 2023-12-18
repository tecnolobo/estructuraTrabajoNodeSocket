const path = require('path');
const fs = require('fs');

class Ticket {
  constructor(numero,escritorio){
    this.number=numero;
    this.escritorio=escritorio;
  }

}
class TicketControl {

  constructor(){
    this.ultimo   = 0;
    this.hoy      = new Date().getDate();
    this.tickets  = [];
    this.utlimos4 =[];

    this.init();
  }

  get toJson(){
    return {
      ultimo   : this.ultimo,
      hoy      : this.hoy,
      tickets  : this.tickets,
      utlimos4 : this.utlimos4
    }
  }

  init(){
    const {hoy,tickets,utlimos4,ultimo} = require('../db/data.json');
    if(hoy==this.hoy){
      this.tickets = tickets;
      this.ultimo= ultimo;
      this.utlimos4=utlimos4
    
    }else{
      this.guardarDb();
    }

  }

  guardarDb(){
    const dbpath = path.join(__dirname,'../db/data.json');
    fs.writeFileSync(dbpath,JSON.stringify(this.toJson));
  }

  siguiente(){
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo,null);
    this.tickets.push(ticket);
    this.guardarDb();
    return `Tikect ${ticket.number}`;
  }

  atenderTiket(escritorio){
    //no hay tickect
    if (this.tickets.length==0){
      return null;
    }

    const ticket = this.tickets[0];
    this.tickets.shift();//Eliminanos el primer ticket

    ticket.escritorio=escritorio;

    this.utlimos4.unshift(ticket); //agregamos en la ultima posicion

    console.log('atnedindo antes '+this.utlimos4.length);

    if(this.utlimos4.length>4){
      this.utlimos4.pop();
      console.log('atnedindo despues '+this.utlimos4.length);
    }

    this.guardarDb();

    return ticket;

  }

}

module.exports=TicketControl;